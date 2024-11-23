from flask import Flask, request, jsonify
import pandas as pd
import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)

# Kết nối cơ sở dữ liệu
def connect_database():
    db = mysql.connector.connect(
        host="localhost",        # Địa chỉ server
        user="root",    # Tên đăng nhập MySQL
        password="123456",# Mật khẩu
        database="TMDTQuanAo", # Tên database
        port=3307,
    )
    return db

# Lấy dữ liệu từ bảng sản phẩm
def fetch_products(db):
    query = "SELECT MASP, TENSANPHAM, description, MALOAI FROM sanpham"
    cursor = db.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    products = pd.DataFrame(results, columns=["MASP", "TENSANPHAM", "description", "MALOAI"])
    return products

# Xây dựng ma trận similarity dựa trên TF-IDF
def build_similarity_matrix(products):
    products['combined_features'] = products['TENSANPHAM'] + " " + products['description'].fillna("")
    tfidf = TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf.fit_transform(products['combined_features'])
    similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)    
    print(similarity_matrix)
    return similarity_matrix

# Hàm gợi ý sản phẩm
def recommend_products(input_product, products, similarity_matrix, top_n=5):
    idx = products[products['TENSANPHAM'].str.contains(input_product, case=False)].index.tolist()
    if not idx:
        return []
    idx = idx[0]
    sim_scores = list(enumerate(similarity_matrix[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    recommended_indices = [i[0] for i in sim_scores[1:top_n+1]]
    recommendations = products.iloc[recommended_indices][["MASP", "TENSANPHAM"]].to_dict(orient="records")
    print(recommendations)
    return recommendations

# Endpoint API để gợi ý sản phẩm
@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        # Kiểm tra dữ liệu đầu vào
        data = request.json
        print(data)
        if not data:
            return jsonify({"error": "Request không chứa dữ liệu JSON"}), 400
        
        input_product = data.get("product_name")
        if not input_product:
            return jsonify({"error": "Thiếu trường 'product_name'"}), 400
        
        # Kết nối cơ sở dữ liệu
        db = connect_database()
        
        # Lấy dữ liệu sản phẩm từ cơ sở dữ liệu
        products = fetch_products(db)
        print(products)
        
        # Xây dựng ma trận similarity
        similarity_matrix = build_similarity_matrix(products)
        
        # Gợi ý sản phẩm dựa trên tên sản phẩm nhập vào
        recommendations = recommend_products(input_product, products, similarity_matrix, top_n=5)
        print(recommendations)
        
        if not recommendations:
            return jsonify({"error": "Không tìm thấy sản phẩm phù hợp."}), 404
        
        # Trả về kết quả với ensure_ascii=False để giữ nguyên ký tự đặc biệt
        response = jsonify({
            "input_product": input_product,
            "recommendations": recommendations
        })
        
        # Set lại header để trả về với UTF-8 (Flask sẽ tự động xử lý mã hóa này)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        
        # Giữ nguyên các ký tự đặc biệt
        response.data = json.dumps(response.get_json(), ensure_ascii=False).encode('utf-8')
        
        return response
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

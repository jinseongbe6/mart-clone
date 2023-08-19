import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FastApiTest() {
  const [goodsData, setGoodsData] = useState({
    name: "Example Goods",
    list_image: "http://example.com/image.jpg",
    goods_price: 1000,
    customer_price: 1200,
    discount_rate: 10,
    discount_amount: 200,
    discount_type: "DISCOUNT_RATE",
    goods_delivery_type: "NORMAL",
    fresh_shipping: false,
    free_shipping: true,
    new_goods: true,
    sales_start_date: "2023-01-29T17:50:44.000+09:00",
    display: true,
    sold_out: false,
    sale: false,
    size_desc: "130x100x40",
    price_desc: "per piece",
    unit_price_desc: "87 per piece",
    membership: false,
    apply_sample: false,
    fresh_food: false,
    custom_made: true,
    box_meat: false,
    weight_unit_price: 100,
    launch_date: "2023-01-29T00:00:00.000+09:00",
    intangible: false,
    delivery_estimate_text: "1~4 days delivery",
  });

  const [goodsList, setGoodsList] = useState([]);
  const [search, setSearch] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/goods/`, goodsData);
      console.log("Data posted successfully:", response);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleGetGood = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/goods/${id}`);
      console.log("Data get successfully:", response);
      setGoodsData(response.data);
    } catch (error) {
      console.error("Error get data:", error);
    }
  };

  const handleSearchGoods = async () => {
    try {
      const response = await axios.get(`${API_URL}/goods/?search=${search}`);
      console.log("Filtered goods fetched successfully:", response);
      setGoodsList(response.data.goods);
    } catch (error) {
      console.error("Error fetching filtered goods:", error);
    }
  };
  const handleDeleteGood = async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/goods/${id}`);
      console.log("Data get successfully:", response);
    } catch (error) {
      console.error("Error get data:", error);
    }
  };

  return (
    <div>
      {/* For simplicity, directly displaying the data as JSON */}
      <pre>{JSON.stringify(goodsData, null, 2)}</pre>
      <button onClick={handleSubmit}>Post Data</button>

      <button onClick={() => handleGetGood(1)}>Get Data</button>
      <button onClick={() => handleDeleteGood(3)}>Delete Data</button>
      <button onClick={() => setGoodsData({})}>Clear State</button>

      <div>
        <h2>Search Goods</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search goods by name..."
        />
        <button onClick={handleSearchGoods}>Search</button>

        <h2>All Goods</h2>
        <ul>
          {goodsList.map((goods) => (
            <li key={goods?.id}>
              {goods?.name} - {goods?.goods_price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

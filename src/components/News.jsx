import React, { useState } from "react";
import { Select, Row, Col, Card, Typography, Avatar } from "antd";
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";
const { Text, Title } = Typography;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, SetNewsCategory] = useState("Cryptocurrency");
  const { data: cryptonews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 15,
  });
  const { data } = useGetCryptosQuery(100);
  console.log(cryptonews);
  if (!cryptonews?.value) return <Loader />;
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Select
          showSearch
          className="select-news"
          placeholder="select a crypto"
          onChange={(value) => SetNewsCategory(value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLocaleLowerCase()) >=
            0
          }
        >
          <Option value="Cryptocurrency">Cryptocurrency</Option>
          {data?.data?.coins.map((coin) => (
            <Option value={coin.name}>{coin.name}</Option>
          ))}
        </Select>
      </Col>

      {cryptonews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={5}>
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                ></img>
              </div>
              <p>
                {" "}
                {news.description > 100
                  ? `${news.description.substring(0, 100)}....`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                  ></Avatar>
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;

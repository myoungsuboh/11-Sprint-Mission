import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const dumyData = {
  idols: [
    {
      id: 599,
      name: "장원영",
      gender: "female",
      group: "아이브",
      profilePicture: "https://example.com/profile.jpg",
      totalVotes: 4,
      teamId: 16,
      rank: 1,
    },
    {
      id: 1188,
      name: "장원영",
      gender: "female",
      group: "아이브",
      profilePicture: "https://example.com/profile.jpg",
      totalVotes: 0,
      teamId: 16,
      rank: 2,
    },
  ],
  nextCursor: 3622,
};

const tabInfo = [
  { key: "female", name: "여자 아이돌" },
  { key: "male", name: "남자 아이돌" },
];

function IdolChartTab(props) {
  const [idolInfo, setIdolInfo] = useState(dumyData);
  const [activeTab, setActiveTab] = useState("female");
  const handleChangeTab = (value) => () => {
    setActiveTab(value);
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://fandom-k-api.vercel.app/아이브/charts/%7Bgender%7D?gender=${activeTab}&pageSize=10`
      );
      if (res.status === 200) {
        setIdolInfo(res.data);
      }
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Section>
        {tabInfo.map((tab) => {
          return (
            <Tab
              key={tab.key}
              activeTab={activeTab}
              onClick={handleChangeTab(tab.key)}
            >
              <TabLabel>{tab.name}</TabLabel>
            </Tab>
          );
        })}
      </Section>
      <Section>
        {idolInfo.idols.map((idol) => {
          return <TabList device="windows">{idol.name}</TabList>;
        })}
      </Section>
      <button>더보기</button>
    </>
  );
}

const Section = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
const Tab = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid #ffffff;
  justify-content: center;
`;
const TabLabel = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
`;
const TabList = styled.div`
  width: ${(props) => (props.device === "windows" ? "50%" : "100%")};
  align-items: center;
  border-bottom: 1px solid #ffffff;
  justify-content: center;
  background: blue;
`;

export default IdolChartTab;

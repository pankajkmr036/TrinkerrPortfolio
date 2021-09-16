import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";
import styles from "./styles";
const url = "http://3.108.244.88:3010/api/portfolios";
const params = {
  skip: 0,
  limit: 50
};
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2NWE0YWVhY2I4NGNiYjI2ODJmOTQiLCJ1c2VybmFtZSI6ImtldGFudGVzdCIsImlhdCI6MTYyNzgwODIyOCwiZXhwIjoxNjQzMzYwMjI4fQ.2uTLhvtXCN8LHDDcknFU42pAKgVHk6aDKKU_OGqWWQE";
axios.defaults.headers.common["user-access-token"] = AUTH_TOKEN;

const UserIcon = require("../../assets/images/appleLogo.png");

const tagsListData = [
  { tagValue: "Equity", tagColor: "red" },
  { tagValue: "Debt", tagColor: "blue" },
  { tagValue: "Future and Options", tagColor: "pink" },
  { tagValue: "Currencies", tagColor: "orange" },
  { tagValue: "Commodities", tagColor: "red" },
  { tagValue: "Equity", tagColor: "red" },
  { tagValue: "Debt", tagColor: "blue" },
  { tagValue: "Future and Options", tagColor: "pink" },
  { tagValue: "Currencies", tagColor: "orange" },
  { tagValue: "Commodities", tagColor: "red" }
];

const metricListData = [
  { heading: "AUM", value: "12 Lakhs" },
  { heading: "Gains", value: "12.23%", metricColor: "green" },
  { heading: "Index", value: "1028.75", metricColor: "green" },
  { heading: "Followers", value: "700K" }
];

const MetricHeading = ({ heading }) => {
  return <Text style={{ fontSize: 14, color: "grey" }}>{heading}</Text>;
};

const MetricValue = props => {
  const { value, metricValueColor } = props;
  return (
    <Text style={{ color: metricValueColor ? metricValueColor : "black" }}>
      {value}
    </Text>
  );
};

const Metric = props => {
  const { heading, value, metricValueColor } = props;
  let customStyles = props.customStyles || {};
  return (
    <View style={[styles.metricContainer, { ...customStyles }]}>
      <MetricHeading heading={heading} />
      <MetricValue value={value} metricValueColor={metricValueColor} />
    </View>
  );
};

const WatchFollowButton = ({ buttonText }) => {
  return <Text style={styles.watchFollowButtonText}>{buttonText}</Text>;
};

const Tag = props => {
  const { containerBackground, tagText } = props;
  return (
    <View
      style={[
        styles.tagContainer,
        { backgroundColor: containerBackground ? containerBackground : "blue" }
      ]}
    >
      <Text style={{ fontSize: 10, color: "white", fontWeight: "800" }}>
        {tagText}
      </Text>
    </View>
  );
};

const Row1 = ({ pfName, pfAuthor, iconSrc }) => {
  return (
    <View style={styles.row1Container}>
      <Image style={styles.iconStyle} resizeMode={"contain"} source={iconSrc} />
      <View style={{ justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 24,
            marginRight: 60,
            flexShrink: 1
          }}
        >
          {pfName}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>by </Text>
          <Text style={{ fontSize: 18, color: "blue" }}>{pfAuthor} </Text>
        </View>
      </View>
    </View>
  );
};

const TagsList = props => {
  return (
    <View style={styles.tagsContainer}>
      {props.tagsListData.map(x => (
        <Tag tagText={x.tagValue} containerBackground={x.tagColor} />
      ))}
    </View>
  );
};

const Row2 = props => {
  return (
    <View style={styles.row2Container}>
      {metricListData.map(x => (
        <Metric
          heading={x.heading}
          value={x.value}
          metricValueColor={x.metricColor}
        />
      ))}
    </View>
  );
};

const Row3 = props => {
  return (
    <View style={styles.row3Container}>
      <Metric
        heading={"Min Follow Amount"}
        value={"Rs 500.00"}
        customStyles={{ alignItems: "flex-start" }}
      />
      <WatchFollowButton buttonText={"Watch"} />
      <WatchFollowButton buttonText={"Follow"} />
    </View>
  );
};
const PfCard = props => {
  const { portfolio } = props;

  if (!portfolio) {
    return null;
  }

  return (
    <View style={styles.pfCardContainer}>
      <Row1
        pfName={portfolio.name}
        pfAuthor={portfolio.name}
        iconSrc={UserIcon}
      />
      <TagsList tagsListData={tagsListData} />
      <Row2 />
      <Row3 />
    </View>
  );
};

const PortfolioList = () => {
  const [loading, setLoading] = useState(true);
  const [pfList, setPfList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPfList = async () => {
      try {
        const { data } = await axios.get(url, params);
        setLoading(false);
        setPfList(data.portfolios);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    getPfList();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Some error occurred</Text>
      </View>
    );
  }

  if (!pfList || !pfList.length) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No portfolio data to show</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#ADD8E6" }}>
      <FlatList
        windowSize={10}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        onEndReachedThreshold={0.003}
        legacyImplementation={true}
        enableEmptySections={true}
        data={pfList}
        showsVerticalScrollIndicator={true}
        renderItem={item => {
          return <PfCard portfolio={item.item} />;
        }}
      />
      <PfCard />
    </View>
  );
};

export default PortfolioList;

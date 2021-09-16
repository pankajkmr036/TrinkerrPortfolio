import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  loaderContainer: { justifyContent: "center", marginTop: 350 },
  pfCardContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8
  },
  row1Container: { flexDirection: "row" },
  iconStyle: { borderRadius: 16, width: 60, height: 60, marginRight: 10 },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap" },
  tagContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 4,
    borderRadius: 8
  },
  row2Container: { flexDirection: "row", flexWrap: "wrap" },
  row3Container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  metricContainer: { alignItems: "center", margin: 8 },
  watchFollowButtonText: { fontSize: 24, color: "blue", marginHorizontal: 4 }
});

export default styles;

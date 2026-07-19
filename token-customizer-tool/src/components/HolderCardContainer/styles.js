const cardStyle = {
    //Layout
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: "1em",
    backgroundColor: "var(--background-secondary)"
};

const cardStyleMobile = {
    //Layout
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    // padding: "0.1em",
    backgroundColor: "var(--background-secondary)"
};

const contentStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    maxWidth: "100%",
};

const contentStyleMobile = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    maxWidth: "100%",
    padding: "0.2em",
};

export { cardStyle, contentStyle, contentStyleMobile, cardStyleMobile };
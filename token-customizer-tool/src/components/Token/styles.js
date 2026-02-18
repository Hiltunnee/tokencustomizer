const tokenShape = {
    aspectRatio: "15 / 15.394",
    clipPath: "polygon(50.00% 24.00%, 92.00% 37.20%, 92.00% 80.90%, 50.00% 67.80%, 8.00% 80.90%, 8.00% 37.20%)",
    maxWidth: "200px",
    maxHeight: "200px"
};

const innerShape = {
    aspectRatio: "15 / 15.394",
    clipPath: "polygon(50% 28%, 88% 40%, 88% 76%, 50% 64%, 12% 76%, 12% 40%)",
    maxWidth: "200px",
    maxHeight: "200px"
};

const outerStyle = {
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    // alignContent: "center", //Vaikuttaa vain riveihin
    position: 'relative',
    //filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.3))"
};

const borderStyle = {
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
    display: 'flex',
    position: 'absolute',
};

const textStyle = {
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    fontFamily: "var(--font-family-token)",
    fontSize: "1.4rem",
    letterSpacing: "0.1rem",
};

const numberStyle = {
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    fontFamily: "var(--font-family-token)",
    // fontWeight: "bold",
    fontSize: "2.9rem",
    // letterSpacing: "0rem",
};

export { tokenShape, innerShape, outerStyle, borderStyle, textStyle, numberStyle };
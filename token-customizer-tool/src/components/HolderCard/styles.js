const holderCardStyle = {
    //Layout
    display: "flex",
    flex: "1 1 200px",
    padding: "1em",
    margin: "1em",

    // Border style
    borderStyle: "solid",
    borderWidth: "0.3em",
    borderColor: "var(--accent-primary)",
    borderRadius: "20px",

    //Colors
    color: "var(--color-primary)",
    backgroundColor: "var(--background-tertiary)"
};

const holderCardStyleMobile = {
    //Layout
    display: "flex",
    flex: "1 1 200px",
    padding: "0em",
    margin: "0.2em",

    // Border style
    borderStyle: "solid",
    borderWidth: "0.2em",
    borderColor: "var(--accent-primary)",
    borderRadius: "10px",

    //Colors
    color: "var(--color-primary)",
    backgroundColor: "var(--background-tertiary)"
};

const radioButtonStyle = {
    margin: "0", 
    justifyContent: "center",
};

const boxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    textAlign: "center",
    color:"var(--text-primary)"
};

const boxStyleMobile = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    textAlign: "center",
    color:"var(--text-primary)"
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain"
};

const imageStyleMobile = {
  width: "80%",
  height: "80%",
  objectFit: "contain"
};

const labelStyle = {
    margin: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column-reverse"
};

export { holderCardStyle, holderCardStyleMobile, radioButtonStyle, boxStyle, boxStyleMobile, labelStyle, imageStyle, imageStyleMobile };

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
    backgroundColor: "var(--accent-tertiary)"
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
    textAlign: "center"
};

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain"
};

const labelStyle = {
    margin: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column-reverse"
};

export { holderCardStyle, radioButtonStyle, boxStyle, labelStyle, imageStyle };

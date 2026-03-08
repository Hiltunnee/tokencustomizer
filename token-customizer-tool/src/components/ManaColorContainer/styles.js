const cardStyle = {
    display: "flex",
    backgroundColor: "var(--backgound-secondary)",
    padding: "2em"
};

const contentStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    maxWidth: "100%",
};

const manaColorsContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    maxWidth: "100%",
};

const manaColorStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    flex: "1 1 200px",
    flexShrink: "1",
    border: "solid",
    borderColor: "var(--accent-primary)",
    borderRadius: "5px",
    padding: "1em",
    backgroundColor: "var(--accent-tertiary)",
};

const labelStyle = {
    margin: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column-reverse"
};

const radioStyle = {
    margin: "0", 
    justifyContent: "center"
};

const imageSizeStyle = { 
    maxWidth: '100%', 
    height: 'auto' 
};

export { cardStyle, contentStyle, manaColorsContainerStyle, radioStyle, labelStyle, manaColorStyle, imageSizeStyle };
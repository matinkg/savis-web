const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 5,
  borderColor: "#d0d4d8",
  borderStyle: "dashed",
  backgroundColor: "transparent",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",

  height: "200px",
};

const focusedStyle: React.CSSProperties = {
  borderColor: "#2196f3",
};

const acceptStyle: React.CSSProperties = {
  borderColor: "#00e676",
};

const rejectStyle: React.CSSProperties = {
  borderColor: "#ff1744",
};

export { baseStyle, focusedStyle, acceptStyle, rejectStyle };

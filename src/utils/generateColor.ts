export const generateColor = (size: number) => {
    const colors = ["#FFDD7D", "#A2FF9B", "#90FFF3", "#FFA9DF", "#DAACFF", "#FFB17D"]
    let index =  size % colors.length;
    return colors[index];
}

export default generateColor;
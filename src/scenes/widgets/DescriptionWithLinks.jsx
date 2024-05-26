import { Typography } from "@mui/material";
import { useTheme } from "@mui/system";

function convertTextToLinks(text, linkColor) {
    // Regular expression to find URLs within text
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    // Replace URLs with anchor tags with custom styles
    var htmlText = text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" style="color: ' + linkColor + ';">' + url + '</a>';
    });
    return { __html: htmlText };
}

const DescriptionWithLinks = ({ description, textColor, linkColor }) => {
    const { palette } = useTheme();
    const main = textColor || palette.neutral.main;

    const convertedDescription = convertTextToLinks(description, linkColor);

    return (
        <Typography
            color={main}
            sx={{ m: "1rem 0" }}
            dangerouslySetInnerHTML={convertedDescription}
        />
    );
};

export default DescriptionWithLinks;

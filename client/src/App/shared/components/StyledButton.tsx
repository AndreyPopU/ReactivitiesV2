import { Button, type ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { LinkProps } from "react-router";

type StyledButtonProps = ButtonProps & Partial<LinkProps>

const StyleButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
    '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[600],
        color: theme.palette.common.white,
        opacity: 1
    }
}))

export default StyleButton
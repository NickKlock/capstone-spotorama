import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";

type CustomAccordionProps = {
    mainContent: string | string[]
    title: string
    icon:any

}
export default function CustomAccordion(props: CustomAccordionProps) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={props.icon}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{Array.isArray(props.mainContent) ? props.mainContent.join(", ").toLowerCase() :
                    props.mainContent.toLowerCase()}</Typography>
            </AccordionDetails>
        </Accordion>
    )
}
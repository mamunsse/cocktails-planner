import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        width: "50%",
        tableLayout: "auto"
    },
    tableContainer: {
        overflowX: 'auto',
        borderRadius: 10,
        margin: '10px 10px 10px 0px',
        marginTop: '40px !important',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    paper: {
        textAlign: "center"
    },
    customCheckbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '64px', /* Adjust width and height as needed */
        height: '40px', /* Adjust width and height as needed */
        borderRadius: '4px', /* Rounded corners, adjust as needed */
        cursor: 'pointer',
        color: '#3f51b5', // Default color
        '&$checked': {
          color: '#3f51b5', // Color when checked
        },
    },
    checked: {},
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2), // Adjust margin as needed
    },
    formControl: {
        minWidth: '250px',
        marginRight: theme.spacing(1),
    },

    redText: {
        color: 'red',
    },

}));

export default useStyles;
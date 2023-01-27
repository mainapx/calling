import * as React from 'react';
import {ListItemIcon } from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import { useRef } from 'react';
import {Select} from '@material-ui/core';
import ReactCountryFlag from "react-country-flag";
import './country.css';


const countries=[
    {
      "COUNTRY": "Afghanistan",
      "COUNTRY CODE": "93",
      "ISO CODES": "AF ",
        "POPULATION": "29,121,286",
      "AREA KM2": "647,500",
     
    },
    {
      "COUNTRY": "Albania",
      "COUNTRY CODE": "355",
      "ISO CODES": "AL",

      "POPULATION": "2,986,952",
      "AREA KM2": "28,748",
     
    },
    {
      "COUNTRY": "Algeria",
      "COUNTRY CODE": "213",
      "ISO CODES": "DZ",

      "POPULATION": "34,586,184",
      "AREA KM2": "2,381,740",
     
    },
    {
      "COUNTRY": "American Samoa",
      "COUNTRY CODE": "684",
      "ISO CODES": "AS",

      "POPULATION": "57,881",
      "AREA KM2": "199",
     
    },
    {
      "COUNTRY": "Andorra",
      "COUNTRY CODE": "376",
      "ISO CODES": "AD",

      "POPULATION": "84,000",
      "AREA KM2": "468",
     
    },
    {
      "COUNTRY": "Angola",
      "COUNTRY CODE": "244",
      "ISO CODES": "AO",

      "POPULATION": "13,068,161",
      "AREA KM2": "1,246,700",
    },
    {
      "COUNTRY": "Anguilla",
      "COUNTRY CODE": "264",
      "ISO CODES": "AI",

      "POPULATION": "13,254",
      "AREA KM2": "102",
     
    },
    {
      "COUNTRY": "Antarctica",
      "COUNTRY CODE": "672",
      "ISO CODES": "AQ",

      "POPULATION": "0",
      "AREA KM2": "14,000,000",
    },
    {
     "COUNTRY": "Antigua and Barbuda",
      "COUNTRY CODE": "268",
      "ISO CODES": "AG",

      "POPULATION": "86,754",
      "AREA KM2": "443",
     
    },
    {
      "COUNTRY": "Argentina",
      "COUNTRY CODE": "54",
      "ISO CODES": "AR",

      "POPULATION": "41,343,201",
      "AREA KM2": "2,766,890",
     
    },
    {
      "COUNTRY": "Armenia",
      "COUNTRY CODE": "374",
      "ISO CODES": "AM",

      "POPULATION": "2,968,000",
      "AREA KM2": "29,800",
     
    },
    {
      "COUNTRY": "Aruba",
      "COUNTRY CODE": "297",
      "ISO CODES": "AW",

      "POPULATION": "71,566",
      "AREA KM2": "193",
     
    },
    {
      "COUNTRY": "Australia",
      "COUNTRY CODE": "61",
      "ISO CODES": "AU",

      "POPULATION": "21,515,754",
      "AREA KM2": "7,686,850",
     
    },
    {
      "COUNTRY": "Austria",
      "COUNTRY CODE": "43",
      "ISO CODES": "AT",

      "POPULATION": "8,205,000",
      "AREA KM2": "83,858",
     
    },
    {
      "COUNTRY": "Azerbaijan",
      "COUNTRY CODE": "994",
      "ISO CODES": "AZ",

      "POPULATION": "8,303,512",
      "AREA KM2": "86,600",
     
    },
    {
      "COUNTRY": "Bahamas",
      "COUNTRY CODE": "242",
      "ISO CODES": "BS",

      "POPULATION": "301,790",
      "AREA KM2": "13,940",
     
    },
    {
      "COUNTRY": "Bahrain",
      "COUNTRY CODE": "973",
      "ISO CODES": "BH",

      "POPULATION": "738,004",
      "AREA KM2": "665",
     
    },
    {
      "COUNTRY": "Bangladesh",
      "COUNTRY CODE": "880",
      "ISO CODES": "BD",

      "POPULATION": "156,118,464",
      "AREA KM2": "144,000",
     
    },
    {
      "COUNTRY": "Barbados",
      "COUNTRY CODE": "246",
      "ISO CODES": "BB",

      "POPULATION": "285,653",
      "AREA KM2": "431",
     
    },
    {
      "COUNTRY": "Belarus",
      "COUNTRY CODE": "375",
      "ISO CODES": "BY",

      "POPULATION": "9,685,000",
      "AREA KM2": "207,600",
     
    },
    {
      "COUNTRY": "Belgium",
      "COUNTRY CODE": "32",
      "ISO CODES": "BE",

      "POPULATION": "10,403,000",
      "AREA KM2": "30,510",
     
    },
    {
      "COUNTRY": "Belize",
      "COUNTRY CODE": "501",
      "ISO CODES": "BZ",

      "POPULATION": "314,522",
      "AREA KM2": "22,966",
     
    },
    {
      "COUNTRY": "Benin",
      "COUNTRY CODE": "229",
      "ISO CODES": "BJ",

      "POPULATION": "9,056,010",
      "AREA KM2": "112,620",
     
    },
    {
      "COUNTRY": "Bermuda",
      "COUNTRY CODE": "441",
      "ISO CODES": "BM",

      "POPULATION": "65,365",
      "AREA KM2": "53",
     
    },
    {
      "COUNTRY": "Bhutan",
      "COUNTRY CODE": "975",
      "ISO CODES": "BT",

      "POPULATION": "699,847",
      "AREA KM2": "47,000",
     
    },
    {
      "COUNTRY": "Bolivia",
      "COUNTRY CODE": "591",
      "ISO CODES": "BO",

      "POPULATION": "9,947,418",
      "AREA KM2": "1,098,580",
     
    },
    {
      "COUNTRY": "Bosnia and Herzegovina",
      "COUNTRY CODE": "387",
      "ISO CODES": "BA",

      "POPULATION": "4,590,000",
      "AREA KM2": "51,129",
     
    },
    {
      "COUNTRY": "Botswana",
      "COUNTRY CODE": "267",
      "ISO CODES": "BW",

      "POPULATION": "2,029,307",
      "AREA KM2": "600,370",
     
    },
    {
      "COUNTRY": "Brazil",
      "COUNTRY CODE": "55",
      "ISO CODES": "BR",

      "POPULATION": "201,103,330",
      "AREA KM2": "8,511,965",
     
    },
    {
      "COUNTRY": "British Indian Ocean Territory",
      "COUNTRY CODE": "246",
      "ISO CODES": "IO",

      "POPULATION": "4,000",
      "AREA KM2": "60",
    },
    {
     "COUNTRY": "British Virgin Islands",
      "COUNTRY CODE": "284",
      "ISO CODES": "VG",

      "POPULATION": "21,730",
      "AREA KM2": "153",
     
    },
    {
      "COUNTRY": "Brunei",
      "COUNTRY CODE": "673",
      "ISO CODES": "BN",

      "POPULATION": "395,027",
      "AREA KM2": "5,770",
     
    },
    {
      "COUNTRY": "Bulgaria",
      "COUNTRY CODE": "359",
      "ISO CODES": "BG",

      "POPULATION": "7,148,785",
      "AREA KM2": "110,910",
     
    },
    {
      "COUNTRY": "Burkina Faso",
      "COUNTRY CODE": "226",
      "ISO CODES": "BF",

      "POPULATION": "16,241,811",
      "AREA KM2": "274,200",
     
    },
    {
      "COUNTRY": "Burundi",
      "COUNTRY CODE": "257",
      "ISO CODES": "BI",

      "POPULATION": "9,863,117",
      "AREA KM2": "27,830",
     
    },
    {
      "COUNTRY": "Cambodia",
      "COUNTRY CODE": "855",
      "ISO CODES": "KH",

      "POPULATION": "14,453,680",
      "AREA KM2": "181,040",
     
    },
    {
      "COUNTRY": "Cameroon",
      "COUNTRY CODE": "237",
      "ISO CODES": "CM",

      "POPULATION": "19,294,149",
      "AREA KM2": "475,440",
     
    },
    {
      "COUNTRY": "Canada",
      "COUNTRY CODE": "1",
      "ISO CODES": "CA",

      "POPULATION": "33,679,000",
      "AREA KM2": "9,984,670",
     
    },
    {
      "COUNTRY": "Cape Verde",
      "COUNTRY CODE": "238",
      "ISO CODES": "CV",

      "POPULATION": "508,659",
      "AREA KM2": "4,033",
     
    },
    {
      "COUNTRY": "Cayman Islands",
      "COUNTRY CODE": "345",
      "ISO CODES": "KY",

      "POPULATION": "44,270",
      "AREA KM2": "262",
     
    },
    {
      "COUNTRY": "Central African Republic",
      "COUNTRY CODE": "236",
      "ISO CODES": "CF",

      "POPULATION": "4,844,927",
      "AREA KM2": "622,984",
     
    },
    {
      "COUNTRY": "Chad",
      "COUNTRY CODE": "235",
      "ISO CODES": "TD",

      "POPULATION": "10,543,464",
      "AREA KM2": "1,284,000",
     
    },
    {
      "COUNTRY": "Chile",
      "COUNTRY CODE": "56",
      "ISO CODES": "CL",

      "POPULATION": "16,746,491",
      "AREA KM2": "756,950",
     
    },
    {
      "COUNTRY": "China",
      "COUNTRY CODE": "86",
      "ISO CODES": "CN",

      "POPULATION": "1,330,044,000",
      "AREA KM2": "9,596,960",
     
    },
    {
      "COUNTRY": "Christmas Island",
      "COUNTRY CODE": "61",
      "ISO CODES": "CX",

      "POPULATION": "1,500",
      "AREA KM2": "135",
    },
    {
     "COUNTRY": "Cocos Islands",
      "COUNTRY CODE": "61",
      "ISO CODES": "CC",

      "POPULATION": "628",
      "AREA KM2": "14",
    },
    {
     "COUNTRY": "Colombia",
      "COUNTRY CODE": "57",
      "ISO CODES": "CO",

      "POPULATION": "47,790,000",
      "AREA KM2": "1,138,910",
     
    },
    {
      "COUNTRY": "Comoros",
      "COUNTRY CODE": "269",
      "ISO CODES": "KM",

      "POPULATION": "773,407",
      "AREA KM2": "2,170",
    },     
    {
      "COUNTRY": "Cook Islands",
      "COUNTRY CODE": "682",
      "ISO CODES": "CK",

      "POPULATION": "21,388",
      "AREA KM2": "240",
     
    },
    {
      "COUNTRY": "Costa Rica",
      "COUNTRY CODE": "506",
      "ISO CODES": "CR",

      "POPULATION": "4,516,220",
      "AREA KM2": "51,100",
     
    },
    {
      "COUNTRY": "Croatia",
      "COUNTRY CODE": "385",
      "ISO CODES": "HR",

      "POPULATION": "4,491,000",
      "AREA KM2": "56,542",
     
    },
    {
      "COUNTRY": "Cuba",
      "COUNTRY CODE": "53",
      "ISO CODES": "CU",

      "POPULATION": "11,423,000",
      "AREA KM2": "110,860",
     
    },
    {
      "COUNTRY": "Curacao",
      "COUNTRY CODE": "599",
      "ISO CODES": "CW",

      "POPULATION": "141,766",
      "AREA KM2": "444",
     
    },
    {
      "COUNTRY": "Cyprus",
      "COUNTRY CODE": "357",
      "ISO CODES": "CY",

      "POPULATION": "1,102,677",
      "AREA KM2": "9,250",
     
    },
    {
      "COUNTRY": "Czech Republic",
      "COUNTRY CODE": "420",
      "ISO CODES": "CZ",

      "POPULATION": "10,476,000",
      "AREA KM2": "78,866",
     
    },
    {
      "COUNTRY": "Democratic Republic of the Congo",
      "COUNTRY CODE": "243",
      "ISO CODES": "CD",

      "POPULATION": "70,916,439",
      "AREA KM2": "2,345,410",
     
    },
    {
      "COUNTRY": "Denmark",
      "COUNTRY CODE": "45",
      "ISO CODES": "DK",

      "POPULATION": "5,484,000",
      "AREA KM2": "43,094",
     
    },
    {
      "COUNTRY": "Djibouti",
      "COUNTRY CODE": "253",
      "ISO CODES": "DJ",

      "POPULATION": "740,528",
      "AREA KM2": "23,000",
     
    },
    {
      "COUNTRY": "Dominica",
      "COUNTRY CODE": "767",
      "ISO CODES": "DM",

      "POPULATION": "72,813",
      "AREA KM2": "754",
    },
     
    {
      "COUNTRY": "Dominican Republic",
      "COUNTRY CODE": "809, 829, 849",
      "ISO CODES": "DO",

      "POPULATION": "9,823,821",
      "AREA KM2": "48,730",
     
    },
    {
      "COUNTRY": "East Timor",
      "COUNTRY CODE": "670",
      "ISO CODES": "TL",

      "POPULATION": "1,154,625",
      "AREA KM2": "15,007",
     
    },
    {
      "COUNTRY": "Ecuador",
      "COUNTRY CODE": "593",
      "ISO CODES": "EC",

      "POPULATION": "14,790,608",
      "AREA KM2": "283,560",
     
    },
    {
      "COUNTRY": "Egypt",
      "COUNTRY CODE": "20",
      "ISO CODES": "EG",

      "POPULATION": "80,471,869",
      "AREA KM2": "1,001,450",
    },
     
    {
      "COUNTRY": "El Salvador",
      "COUNTRY CODE": "503",
      "ISO CODES": "SV",

      "POPULATION": "6,052,064",
      "AREA KM2": "21,040",
     
    },
    {
      "COUNTRY": "Equatorial Guinea",
      "COUNTRY CODE": "240",
      "ISO CODES": "GQ",

      "POPULATION": "1,014,999",
      "AREA KM2": "28,051",
     
    },
    {
      "COUNTRY": "Eritrea",
      "COUNTRY CODE": "291",
      "ISO CODES": "ER",

      "POPULATION": "5,792,984",
      "AREA KM2": "121,320",
     
    },
    {
      "COUNTRY": "Estonia",
      "COUNTRY CODE": "372",
      "ISO CODES": "EE",

      "POPULATION": "1,291,170",
      "AREA KM2": "45,226",
     
    },
    {
      "COUNTRY": "Ethiopia",
      "COUNTRY CODE": "251",
      "ISO CODES": "ET",

      "POPULATION": "88,013,491",
      "AREA KM2": "1,127,127",
     
    },
    {
      "COUNTRY": "Falkland Islands",
      "COUNTRY CODE": "500",
      "ISO CODES": "FK",

      "POPULATION": "2,638",
      "AREA KM2": "12,173",
     
    },
    {
      "COUNTRY": "Faroe Islands",
      "COUNTRY CODE": "298",
      "ISO CODES": "FO",

      "POPULATION": "48,228",
      "AREA KM2": "1,399",
     
    },
    {
      "COUNTRY": "Fiji",
      "COUNTRY CODE": "679",
      "ISO CODES": "FJ",

      "POPULATION": "875,983",
      "AREA KM2": "18,270",
     
    },
    {
      "COUNTRY": "Finland",
      "COUNTRY CODE": "358",
      "ISO CODES": "FI",

      "POPULATION": "5,244,000",
      "AREA KM2": "337,030",
     
    },
    {
      "COUNTRY": "France",
      "COUNTRY CODE": "33",
      "ISO CODES": "FR",

      "POPULATION": "64,768,389",
      "AREA KM2": "547,030",
     
    },
    {
      "COUNTRY": "French Polynesia",
      "COUNTRY CODE": "689",
      "ISO CODES": "PF",

      "POPULATION": "270,485",
      "AREA KM2": "4,167",
     
    },
    {
      "COUNTRY": "Gabon",
      "COUNTRY CODE": "241",
      "ISO CODES": "GA",

      "POPULATION": "1,545,255",
      "AREA KM2": "267,667",
     
    },
    {
      "COUNTRY": "Gambia",
      "COUNTRY CODE": "220",
      "ISO CODES": "GM",

      "POPULATION": "1,593,256",
      "AREA KM2": "11,300",
    },
     
    {
      "COUNTRY": "Georgia",
      "COUNTRY CODE": "995",
      "ISO CODES": "GE",

      "POPULATION": "4,630,000",
      "AREA KM2": "69,700",
     
    },
    {
      "COUNTRY": "Germany",
      "COUNTRY CODE": "49",
      "ISO CODES": "DE",

      "POPULATION": "81,802,257",
      "AREA KM2": "357,021",
     
    },
    {
      "COUNTRY": "Ghana",
      "COUNTRY CODE": "233",
      "ISO CODES": "GH",

      "POPULATION": "24,339,838",
      "AREA KM2": "239,460",
     
    },
    {
      "COUNTRY": "Gibraltar",
      "COUNTRY CODE": "350",
      "ISO CODES": "GI",

      "POPULATION": "27,884",
      "AREA KM2": "7",
     
    },
    {
      "COUNTRY": "Greece",
      "COUNTRY CODE": "30",
      "ISO CODES": "GR",

      "POPULATION": "11,000,000",
      "AREA KM2": "131,940",
     
    },
    {
      "COUNTRY": "Greenland",
      "COUNTRY CODE": "299",
      "ISO CODES": "GL",

      "POPULATION": "56,375",
      "AREA KM2": "2,166,086",
     
    },
    {
      "COUNTRY": "Grenada",
      "COUNTRY CODE": "473",
      "ISO CODES": "GD",

      "POPULATION": "107,818",
      "AREA KM2": "344",
    },
     
    {
      "COUNTRY": "Guam",
      "COUNTRY CODE": "671",
      "ISO CODES": "GU",

      "POPULATION": "159,358",
      "AREA KM2": "549",
     
    },
    {
      "COUNTRY": "Guatemala",
      "COUNTRY CODE": "502",
      "ISO CODES": "GT",

      "POPULATION": "13,550,440",
      "AREA KM2": "108,890",
     
    },
    {
      "COUNTRY": "Guernsey",
      "COUNTRY CODE": "44-1481",
      "ISO CODES": "GG",

      "POPULATION": "65,228",
      "AREA KM2": "78",
     
    },
    {
      "COUNTRY": "Guinea",
      "COUNTRY CODE": "224",
      "ISO CODES": "GN",

      "POPULATION": "10,324,025",
      "AREA KM2": "245,857",
     
    },
    {
      "COUNTRY": "Guinea-Bissau",
      "COUNTRY CODE": "245",
      "ISO CODES": "GW",

      "POPULATION": "1,565,126",
      "AREA KM2": "36,120",
    },
     
    {
      "COUNTRY": "Guyana",
      "COUNTRY CODE": "592",
      "ISO CODES": "GY",

      "POPULATION": "748,486",
      "AREA KM2": "214,970",
     
    },
    {
      "COUNTRY": "Haiti",
      "COUNTRY CODE": "509",
      "ISO CODES": "HT",

      "POPULATION": "9,648,924",
      "AREA KM2": "27,750",
     
    },
    {
      "COUNTRY": "Honduras",
      "COUNTRY CODE": "504",
      "ISO CODES": "HN",

      "POPULATION": "7,989,415",
      "AREA KM2": "112,090",
     
    },
    {
      "COUNTRY": "Hong Kong",
      "COUNTRY CODE": "852",
      "ISO CODES": "HK",

      "POPULATION": "6,898,686",
      "AREA KM2": "1,092",
     
    },
    {
      "COUNTRY": "Hungary",
      "COUNTRY CODE": "36",
      "ISO CODES": "HU",

      "POPULATION": "9,982,000",
      "AREA KM2": "93,030",
     
    },
    {
      "COUNTRY": "Iceland",
      "COUNTRY CODE": "354",
      "ISO CODES": "IS",

      "POPULATION": "308,910",
      "AREA KM2": "103,000",
     
    },
    {
      "COUNTRY": "India",
      "COUNTRY CODE": "91",
      "ISO CODES": "IN",

      "POPULATION": "1,173,108,018",
      "AREA KM2": "3,287,590",
     
    },
    {
      "COUNTRY": "Indonesia",
      "COUNTRY CODE": "62",
      "ISO CODES": "ID",

      "POPULATION": "242,968,342",
      "AREA KM2": "1,919,440",
     
    },
    {
      "COUNTRY": "Iran",
      "COUNTRY CODE": "98",
      "ISO CODES": "IR",

      "POPULATION": "76,923,300",
      "AREA KM2": "1,648,000",
     
    },
    {
      "COUNTRY": "Iraq",
      "COUNTRY CODE": "964",
      "ISO CODES": "IQ",

      "POPULATION": "29,671,605",
      "AREA KM2": "437,072",
     
    },
    {
      "COUNTRY": "Ireland",
      "COUNTRY CODE": "353",
      "ISO CODES": "IE",

      "POPULATION": "4,622,917",
      "AREA KM2": "70,280",
     
    },
    {
      "COUNTRY": "Isle of Man",
      "COUNTRY CODE": "44-1624",
      "ISO CODES": "IM",

      "POPULATION": "75,049",
      "AREA KM2": "572",
     
    },
    {
      "COUNTRY": "Israel",
      "COUNTRY CODE": "972",
      "ISO CODES": "IL",

      "POPULATION": "7,353,985",
      "AREA KM2": "20,770",
     
    },
    {
      "COUNTRY": "Italy",
      "COUNTRY CODE": "39",
      "ISO CODES": "IT",

      "POPULATION": "60,340,328",
      "AREA KM2": "301,230",
     
    },
    {
      "COUNTRY": "Ivory Coast",
      "COUNTRY CODE": "225",
      "ISO CODES": "CI",

      "POPULATION": "21,058,798",
      "AREA KM2": "322,460",
     
    },
    {
      "COUNTRY": "Jamaica",
      "COUNTRY CODE": "876",
      "ISO CODES": "JM",

      "POPULATION": "2,847,232",
      "AREA KM2": "10,991",
     
    },
    {
      "COUNTRY": "Japan",
      "COUNTRY CODE": "81",
      "ISO CODES": "JP",

      "POPULATION": "127,288,000",
      "AREA KM2": "377,835",
     
    },
    {
      "COUNTRY": "Jersey",
      "COUNTRY CODE": "44-1534",
      "ISO CODES": "JE",

      "POPULATION": "90,812",
      "AREA KM2": "116",
     
    },
    {
      "COUNTRY": "Jordan",
      "COUNTRY CODE": "962",
      "ISO CODES": "JO",

      "POPULATION": "6,407,085",
      "AREA KM2": "92,300",
     
    },
    {
      "COUNTRY": "Kazakhstan",
      "COUNTRY CODE": "7",
      "ISO CODES": "KZ",

      "POPULATION": "15,340,000",
      "AREA KM2": "2,717,300",
     
    },
    {
      "COUNTRY": "Kenya",
      "COUNTRY CODE": "254",
      "ISO CODES": "KE",

      "POPULATION": "40,046,566",
      "AREA KM2": "582,650",
     
    },
    {
      "COUNTRY": "Kiribati",
      "COUNTRY CODE": "686",
      "ISO CODES": "KI",

      "POPULATION": "92,533",
      "AREA KM2": "811",
    },
     
    {
      "COUNTRY": "Kosovo",
      "COUNTRY CODE": "383",
      "ISO CODES": "XK",

      "POPULATION": "1,800,000",
      "AREA KM2": "10,887",
     
    },
    {
      "COUNTRY": "Kuwait",
      "COUNTRY CODE": "965",
      "ISO CODES": "KW",

      "POPULATION": "2,789,132",
      "AREA KM2": "17,820",
     
    },
    {
      "COUNTRY": "Kyrgyzstan",
      "COUNTRY CODE": "996",
      "ISO CODES": "KG",

      "POPULATION": "5,508,626",
      "AREA KM2": "198,500",
     
    },
    {
      "COUNTRY": "Laos",
      "COUNTRY CODE": "856",
      "ISO CODES": "LA",

      "POPULATION": "6,368,162",
      "AREA KM2": "236,800",
     
    },
    {
      "COUNTRY": "Latvia",
      "COUNTRY CODE": "371",
      "ISO CODES": "LV",

      "POPULATION": "2,217,969",
      "AREA KM2": "64,589",
     
    },
    {
      "COUNTRY": "Lebanon",
      "COUNTRY CODE": "961",
      "ISO CODES": "LB",

      "POPULATION": "4,125,247",
      "AREA KM2": "10,400",
     
    },
    {
      "COUNTRY": "Lesotho",
      "COUNTRY CODE": "266",
      "ISO CODES": "LS",

      "POPULATION": "1,919,552",
      "AREA KM2": "30,355",
     
    },
    {
      "COUNTRY": "Liberia",
      "COUNTRY CODE": "231",
      "ISO CODES": "LR",

      "POPULATION": "3,685,076",
      "AREA KM2": "111,370",
     
    },
    {
      "COUNTRY": "Libya",
      "COUNTRY CODE": "218",
      "ISO CODES": "LY",

      "POPULATION": "6,461,454",
      "AREA KM2": "1,759,540",
     
    },
    {
      "COUNTRY": "Liechtenstein",
      "COUNTRY CODE": "423",
      "ISO CODES": "LI",

      "POPULATION": "35,000",
      "AREA KM2": "160",
     
    },
    {
      "COUNTRY": "Lithuania",
      "COUNTRY CODE": "370",
      "ISO CODES": "LT",

      "POPULATION": "2,944,459",
      "AREA KM2": "65,200",
     
    },
    {
      "COUNTRY": "Luxembourg",
      "COUNTRY CODE": "352",
      "ISO CODES": "LU",

      "POPULATION": "497,538",
      "AREA KM2": "2,586",
     
    },
    {
      "COUNTRY": "Macau",
      "COUNTRY CODE": "853",
      "ISO CODES": "MO",

      "POPULATION": "449,198",
      "AREA KM2": "254",
     
    },
    {
      "COUNTRY": "Macedonia",
      "COUNTRY CODE": "389",
      "ISO CODES": "MK",

      "POPULATION": "2,062,294",
      "AREA KM2": "25,333",
     
    },
    {
      "COUNTRY": "Madagascar",
      "COUNTRY CODE": "261",
      "ISO CODES": "MG",

      "POPULATION": "21,281,844",
      "AREA KM2": "587,040",
     
    },
    {
      "COUNTRY": "Malawi",
      "COUNTRY CODE": "265",
      "ISO CODES": "MW",

      "POPULATION": "15,447,500",
      "AREA KM2": "118,480",
     
    },
    {
      "COUNTRY": "Malaysia",
      "COUNTRY CODE": "60",
      "ISO CODES": "MY",

      "POPULATION": "28,274,729",
      "AREA KM2": "329,750",
     
    },
    {
      "COUNTRY": "Maldives",
      "COUNTRY CODE": "960",
      "ISO CODES": "MV",

      "POPULATION": "395,650",
      "AREA KM2": "300",
     
    },
    {
      "COUNTRY": "Mali",
      "COUNTRY CODE": "223",
      "ISO CODES": "ML",

      "POPULATION": "13,796,354",
      "AREA KM2": "1,240,000",
     
    },
    {
      "COUNTRY": "Malta",
      "COUNTRY CODE": "356",
      "ISO CODES": "MT",

      "POPULATION": "403,000",
      "AREA KM2": "316",
     
    },
    {
      "COUNTRY": "Marshall Islands",
      "COUNTRY CODE": "692",
      "ISO CODES": "MH",

      "POPULATION": "65,859",
      "AREA KM2": "181",
    },
    {
      "COUNTRY": "Mauritania",
      "COUNTRY CODE": "222",
      "ISO CODES": "MR",

      "POPULATION": "3,205,060",
      "AREA KM2": "1,030,700",
     
    },
    {
      "COUNTRY": "Mauritius",
      "COUNTRY CODE": "230",
      "ISO CODES": "MU",

      "POPULATION": "1,294,104",
      "AREA KM2": "2,040",
     
    },
    {
      "COUNTRY": "Mayotte",
      "COUNTRY CODE": "262",
      "ISO CODES": "YT",

      "POPULATION": "159,042",
      "AREA KM2": "374",
    },
    {
      "COUNTRY": "Mexico",
      "COUNTRY CODE": "52",
      "ISO CODES": "MX",

      "POPULATION": "112,468,855",
      "AREA KM2": "1,972,550",
     
    },
    {
      "COUNTRY": "Micronesia",
      "COUNTRY CODE": "691",
      "ISO CODES": "FM",

      "POPULATION": "107,708",
      "AREA KM2": "702",
    },
    {
      "COUNTRY": "Moldova",
      "COUNTRY CODE": "373",
      "ISO CODES": "MD",

      "POPULATION": "4,324,000",
      "AREA KM2": "33,843",
     
    },
    {
      "COUNTRY": "Monaco",
      "COUNTRY CODE": "377",
      "ISO CODES": "MC",

      "POPULATION": "32,965",
      "AREA KM2": "2",
     
    },
    {
      "COUNTRY": "Mongolia",
      "COUNTRY CODE": "976",
      "ISO CODES": "MN",

      "POPULATION": "3,086,918",
      "AREA KM2": "1,565,000",
     
    },
    {
      "COUNTRY": "Montenegro",
      "COUNTRY CODE": "382",
      "ISO CODES": "ME",

      "POPULATION": "666,730",
      "AREA KM2": "14,026",
     
    },
    {
      "COUNTRY": "Montserrat",
      "COUNTRY CODE": "664",
      "ISO CODES": "MS",

      "POPULATION": "9,341",
      "AREA KM2": "102",
    },
    {
      "COUNTRY": "Morocco",
      "COUNTRY CODE": "212",
      "ISO CODES": "MA",

      "POPULATION": "31,627,428",
      "AREA KM2": "446,550",
     
    },
    {
      "COUNTRY": "Mozambique",
      "COUNTRY CODE": "258",
      "ISO CODES": "MZ",

      "POPULATION": "22,061,451",
      "AREA KM2": "801,590",
     
    },
    {
      "COUNTRY": "Myanmar",
      "COUNTRY CODE": "95",
      "ISO CODES": "MM",

      "POPULATION": "53,414,374",
      "AREA KM2": "678,500",
     
    },
    {
      "COUNTRY": "Namibia",
      "COUNTRY CODE": "264",
      "ISO CODES": "NA",

      "POPULATION": "2,128,471",
      "AREA KM2": "825,418",
     
    },
    {
      "COUNTRY": "Nauru",
      "COUNTRY CODE": "674",
      "ISO CODES": "NR",

      "POPULATION": "10,065",
      "AREA KM2": "21",
    },
    {
     "COUNTRY": "Nepal",
      "COUNTRY CODE": "977",
      "ISO CODES": "NP",

      "POPULATION": "28,951,852",
      "AREA KM2": "140,800",
    },
    {
      "COUNTRY": "Netherlands",
      "COUNTRY CODE": "31",
      "ISO CODES": "NL",

      "POPULATION": "16,645,000",
      "AREA KM2": "41,526",
     
    },
    {
      "COUNTRY": "Netherlands Antilles",
      "COUNTRY CODE": "599",
      "ISO CODES": "AN",

      "POPULATION": "136,197",
      "AREA KM2": "960",
    },
    {
     "COUNTRY": "New Caledonia",
      "COUNTRY CODE": "687",
      "ISO CODES": "NC",

      "POPULATION": "216,494",
      "AREA KM2": "19,060",
     
    },
    {
      "COUNTRY": "New Zealand",
      "COUNTRY CODE": "64",
      "ISO CODES": "NZ",

      "POPULATION": "4,252,277",
      "AREA KM2": "268,680",
     
    },
    {
      "COUNTRY": "Nicaragua",
      "COUNTRY CODE": "505",
      "ISO CODES": "NI",

      "POPULATION": "5,995,928",
      "AREA KM2": "129,494",
     
    },
    {
      "COUNTRY": "Niger",
      "COUNTRY CODE": "227",
      "ISO CODES": "NE",

      "POPULATION": "15,878,271",
      "AREA KM2": "1,267,000",
     
    },
    {
      "COUNTRY": "Nigeria",
      "COUNTRY CODE": "234",
      "ISO CODES": "NG",

      "POPULATION": "154,000,000",
      "AREA KM2": "923,768",
    },
    {
      "COUNTRY": "Niue",
      "COUNTRY CODE": "683",
      "ISO CODES": "NU",

      "POPULATION": "2,166",
      "AREA KM2": "260",
     
    },
    {
      "COUNTRY": "North Korea",
      "COUNTRY CODE": "850",
      "ISO CODES": "KP",

      "POPULATION": "22,912,177",
      "AREA KM2": "120,540",
    },
    {
      "COUNTRY": "Northern Mariana Islands",
      "COUNTRY CODE": "670",
      "ISO CODES": "MP",

      "POPULATION": "53,883",
      "AREA KM2": "477",
    },
    {
      "COUNTRY": "Norway",
      "COUNTRY CODE": "47",
      "ISO CODES": "NO",

      "POPULATION": "5,009,150",
      "AREA KM2": "324,220",
     
    },
    {
      "COUNTRY": "Oman",
      "COUNTRY CODE": "968",
      "ISO CODES": "OM",

      "POPULATION": "2,967,717",
      "AREA KM2": "212,460",
     
    },
    {
      "COUNTRY": "Pakistan",
      "COUNTRY CODE": "92",
      "ISO CODES": "PK",

      "POPULATION": "184,404,791",
      "AREA KM2": "803,940",
     
    },
    {
      "COUNTRY": "Palau",
      "COUNTRY CODE": "680",
      "ISO CODES": "PW",

      "POPULATION": "19,907",
      "AREA KM2": "458",
    },
    {
      "COUNTRY": "Palestine",
      "COUNTRY CODE": "970",
      "ISO CODES": "PS",

      "POPULATION": "3,800,000",
      "AREA KM2": "5,970",
     
    },
    {
      "COUNTRY": "Panama",
      "COUNTRY CODE": "507",
      "ISO CODES": "PA",

      "POPULATION": "3,410,676",
      "AREA KM2": "78,200",
     
    },
    {
      "COUNTRY": "Papua New Guinea",
      "COUNTRY CODE": "675",
      "ISO CODES": "PG",

      "POPULATION": "6,064,515",
      "AREA KM2": "462,840",
     
    },
    {
      "COUNTRY": "Paraguay",
      "COUNTRY CODE": "595",
      "ISO CODES": "PY",

      "POPULATION": "6,375,830",
      "AREA KM2": "406,750",
     
    },
    {
      "COUNTRY": "Peru",
      "COUNTRY CODE": "51",
      "ISO CODES": "PE",

      "POPULATION": "29,907,003",
      "AREA KM2": "1,285,220",
     
    },
    {
      "COUNTRY": "Philippines",
      "COUNTRY CODE": "63",
      "ISO CODES": "PH",

      "POPULATION": "99,900,177",
      "AREA KM2": "300,000",
     
    },
    {
      "COUNTRY": "Pitcairn",
      "COUNTRY CODE": "64",
      "ISO CODES": "PN",

      "POPULATION": "46",
      "AREA KM2": "47",
    },
    {
      "COUNTRY": "Poland",
      "COUNTRY CODE": "48",
      "ISO CODES": "PL",

      "POPULATION": "38,500,000",
      "AREA KM2": "312,685",
    },
    {
      "COUNTRY": "Portugal",
      "COUNTRY CODE": "351",
      "ISO CODES": "PT",

      "POPULATION": "10,676,000",
      "AREA KM2": "92,391",
     
    },
    {
      "COUNTRY": "Puerto Rico",
      "COUNTRY CODE": "787, 939",
      "ISO CODES": "PR",

      "POPULATION": "3,916,632",
      "AREA KM2": "9,104",
     
    },
    {
      "COUNTRY": "Qatar",
      "COUNTRY CODE": "974",
      "ISO CODES": "QA",

      "POPULATION": "840,926",
      "AREA KM2": "11,437",
     
    },
    {
      "COUNTRY": "Republic of the Congo",
      "COUNTRY CODE": "242",
      "ISO CODES": "CG",

      "POPULATION": "3,039,126",
      "AREA KM2": "342,000",
     
    },
    {
      "COUNTRY": "Reunion",
      "COUNTRY CODE": "262",
      "ISO CODES": "RE",

      "POPULATION": "776,948",
      "AREA KM2": "2,517",
    },
    {
     "COUNTRY": "Romania",
      "COUNTRY CODE": "40",
      "ISO CODES": "RO",

      "POPULATION": "21,959,278",
      "AREA KM2": "237,500",
    },
    {
      "COUNTRY": "Russia",
      "COUNTRY CODE": "7",
      "ISO CODES": "RU",

      "POPULATION": "140,702,000",
      "AREA KM2": "17,100,000",
     
    },
    {
      "COUNTRY": "Rwanda",
      "COUNTRY CODE": "250",
      "ISO CODES": "RW",

      "POPULATION": "11,055,976",
      "AREA KM2": "26,338",
     
    },
    {
      "COUNTRY": "Saint Barthelemy",
      "COUNTRY CODE": "590",
      "ISO CODES": "BL",

      "POPULATION": "8,450",
      "AREA KM2": "21",
    },
    {
     "COUNTRY": "Saint Helena",
      "COUNTRY CODE": "290",
      "ISO CODES": "SH",

      "POPULATION": "7,460",
      "AREA KM2": "410",
    },
    {
     "COUNTRY": "Saint Kitts and Nevis",
      "COUNTRY CODE": "869",
      "ISO CODES": "KN",

      "POPULATION": "51,134",
      "AREA KM2": "261",
    },
    {
      "COUNTRY": "Saint Lucia",
      "COUNTRY CODE": "758",
      "ISO CODES": "LC",

      "POPULATION": "160,922",
      "AREA KM2": "616",
     
    },
    {
      "COUNTRY": "Saint Martin",
      "COUNTRY CODE": "590",
      "ISO CODES": "MF",

      "POPULATION": "35,925",
      "AREA KM2": "53",
     
    },
    {
      "COUNTRY": "Saint Pierre and Miquelon",
      "COUNTRY CODE": "508",
      "ISO CODES": "PM",

      "POPULATION": "7,012",
      "AREA KM2": "242",
     
    },
    {
      "COUNTRY": "Saint Vincent and the Grenadines",
      "COUNTRY CODE": "784",
      "ISO CODES": "VC",

      "POPULATION": "104,217",
      "AREA KM2": "389",
    },
    {
      "COUNTRY": "Samoa",
      "COUNTRY CODE": "685",
      "ISO CODES": "WS",

      "POPULATION": "192,001",
      "AREA KM2": "2,944",
    },
    {
      "COUNTRY": "San Marino",
      "COUNTRY CODE": "378",
      "ISO CODES": "SM",

      "POPULATION": "31,477",
      "AREA KM2": "61",
     
    },
    {
      "COUNTRY": "Sao Tome and Principe",
      "COUNTRY CODE": "239",
      "ISO CODES": "ST",

      "POPULATION": "175,808",
      "AREA KM2": "1,001",
    },
    {
      "COUNTRY": "Saudi Arabia",
      "COUNTRY CODE": "966",
      "ISO CODES": "SA",

      "POPULATION": "25,731,776",
      "AREA KM2": "1,960,582",
     
    },
    {
      "COUNTRY": "Senegal",
      "COUNTRY CODE": "221",
      "ISO CODES": "SN",

      "POPULATION": "12,323,252",
      "AREA KM2": "196,190",
     
    },
    {
      "COUNTRY": "Serbia",
      "COUNTRY CODE": "381",
      "ISO CODES": "RS",

      "POPULATION": "7,344,847",
      "AREA KM2": "88,361",
     
    },
    {
      "COUNTRY": "Seychelles",
      "COUNTRY CODE": "248",
      "ISO CODES": "SC",

      "POPULATION": "88,340",
      "AREA KM2": "455",
     
    },
    {
      "COUNTRY": "Sierra Leone",
      "COUNTRY CODE": "232",
      "ISO CODES": "SL",

      "POPULATION": "5,245,695",
      "AREA KM2": "71,740",
     
    },
    {
      "COUNTRY": "Singapore",
      "COUNTRY CODE": "65",
      "ISO CODES": "SG",

      "POPULATION": "4,701,069",
      "AREA KM2": "693",
     
    },
    {
      "COUNTRY": "Sint Maarten",
      "COUNTRY CODE": "721",
      "ISO CODES": "SX",

      "POPULATION": "37,429",
      "AREA KM2": "34",
     
    },
    {
      "COUNTRY": "Slovakia",
      "COUNTRY CODE": "421",
      "ISO CODES": "SK",

      "POPULATION": "5,455,000",
      "AREA KM2": "48,845",
     
    },
    {
      "COUNTRY": "Slovenia",
      "COUNTRY CODE": "386",
      "ISO CODES": "SI",

      "POPULATION": "2,007,000",
      "AREA KM2": "20,273",
     
    },
    {
      "COUNTRY": "Solomon Islands",
      "COUNTRY CODE": "677",
      "ISO CODES": "SB",

      "POPULATION": "559,198",
      "AREA KM2": "28,450",
     
    },
    {
      "COUNTRY": "Somalia",
      "COUNTRY CODE": "252",
      "ISO CODES": "SO",

      "POPULATION": "10,112,453",
      "AREA KM2": "637,657",
     
    },
    {
      "COUNTRY": "South Africa",
      "COUNTRY CODE": "27",
      "ISO CODES": "ZA",

      "POPULATION": "49,000,000",
      "AREA KM2": "1,219,912",
     
    },
    {
      "COUNTRY": "South Korea",
      "COUNTRY CODE": "82",
      "ISO CODES": "KR",

      "POPULATION": "48,422,644",
      "AREA KM2": "98,480",
     
    },
    {
      "COUNTRY": "South Sudan",
      "COUNTRY CODE": "211",
      "ISO CODES": "SS",

      "POPULATION": "8,260,490",
      "AREA KM2": "644,329",
     
    },
    {
      "COUNTRY": "Spain",
      "COUNTRY CODE": "34",
      "ISO CODES": "ES",

      "POPULATION": "46,505,963",
      "AREA KM2": "504,782",
     
    },
    {
      "COUNTRY": "Sri Lanka",
      "COUNTRY CODE": "94",
      "ISO CODES": "LK",

      "POPULATION": "21,513,990",
      "AREA KM2": "65,610",
     
    },
    {
      "COUNTRY": "Sudan",
      "COUNTRY CODE": "249",
      "ISO CODES": "SD",

      "POPULATION": "35,000,000",
      "AREA KM2": "1,861,484",
     
    },
    {
      "COUNTRY": "Suriname",
      "COUNTRY CODE": "597",
      "ISO CODES": "SR",

      "POPULATION": "492,829",
      "AREA KM2": "163,270",
     
    },
    {
      "COUNTRY": "Svalbard and Jan Mayen",
      "COUNTRY CODE": "47",
      "ISO CODES": "SJ",

      "POPULATION": "2,550",
      "AREA KM2": "62,049",
    },
    {
     "COUNTRY": "Swaziland",
      "COUNTRY CODE": "268",
      "ISO CODES": "SZ",

      "POPULATION": "1,354,051",
      "AREA KM2": "17,363",
    },
    {
      "COUNTRY": "Sweden",
      "COUNTRY CODE": "46",
      "ISO CODES": "SE",

      "POPULATION": "9,555,893",
      "AREA KM2": "449,964",
    },
    {
      "COUNTRY": "Switzerland",
      "COUNTRY CODE": "41",
      "ISO CODES": "CH",

      "POPULATION": "7,581,000",
      "AREA KM2": "41,290",
     
    },
    {
      "COUNTRY": "Syria",
      "COUNTRY CODE": "963",
      "ISO CODES": "SY",

      "POPULATION": "22,198,110",
      "AREA KM2": "185,180",
     
    },
    {
      "COUNTRY": "Taiwan",
      "COUNTRY CODE": "886",
      "ISO CODES": "TW",

      "POPULATION": "22,894,384",
      "AREA KM2": "35,980",
     
    },
    {
      "COUNTRY": "Tajikistan",
      "COUNTRY CODE": "992",
      "ISO CODES": "TJ",

      "POPULATION": "7,487,489",
      "AREA KM2": "143,100",
     
    },
    {
      "COUNTRY": "Tanzania",
      "COUNTRY CODE": "255",
      "ISO CODES": "TZ",

      "POPULATION": "41,892,895",
      "AREA KM2": "945,087",
     
    },
    {
      "COUNTRY": "Thailand",
      "COUNTRY CODE": "66",
      "ISO CODES": "TH",

      "POPULATION": "67,089,500",
      "AREA KM2": "514,000",
     
    },
    {
      "COUNTRY": "Togo",
      "COUNTRY CODE": "228",
      "ISO CODES": "TG",

      "POPULATION": "6,587,239",
      "AREA KM2": "56,785",
     
    },
    {
      "COUNTRY": "Tokelau",
      "COUNTRY CODE": "690",
      "ISO CODES": "TK",

      "POPULATION": "1,466",
      "AREA KM2": "10",
    },
    {
     "COUNTRY": "Tonga",
      "COUNTRY CODE": "676",
      "ISO CODES": "TO",

      "POPULATION": "122,580",
      "AREA KM2": "748",
    },
    {
      "COUNTRY": "Trinidad and Tobago",
      "COUNTRY CODE": "868",
      "ISO CODES": "TT",

      "POPULATION": "1,228,691",
      "AREA KM2": "5,128",
     
    },
    {
      "COUNTRY": "Tunisia",
      "COUNTRY CODE": "216",
      "ISO CODES": "TN",

      "POPULATION": "10,589,025",
      "AREA KM2": "163,610",
     
    },
    {
      "COUNTRY": "Turkey",
      "COUNTRY CODE": "90",
      "ISO CODES": "TR",

      "POPULATION": "77,804,122",
      "AREA KM2": "780,580",
     
    },
    {
      "COUNTRY": "Turkmenistan",
      "COUNTRY CODE": "993",
      "ISO CODES": "TM",

      "POPULATION": "4,940,916",
      "AREA KM2": "488,100",
     
    },
    {
      "COUNTRY": "Turks and Caicos Islands",
      "COUNTRY CODE": "649",
      "ISO CODES": "TC",

      "POPULATION": "20,556",
      "AREA KM2": "430",
    },
    {
     "COUNTRY": "Tuvalu",
      "COUNTRY CODE": "688",
      "ISO CODES": "TV",

      "POPULATION": "10,472",
      "AREA KM2": "26",
    },
    {
      "COUNTRY": "U.S. Virgin Islands",
      "COUNTRY CODE": "340",
      "ISO CODES": "VI",

      "POPULATION": "108,708",
      "AREA KM2": "352",
    },
    {
     "COUNTRY": "Uganda",
      "COUNTRY CODE": "256",
      "ISO CODES": "UG",

      "POPULATION": "33,398,682",
      "AREA KM2": "236,040",
     
    },
    {
      "COUNTRY": "Ukraine",
      "COUNTRY CODE": "380",
      "ISO CODES": "UA",

      "POPULATION": "45,415,596",
      "AREA KM2": "603,700",
     
    },
    {
      "COUNTRY": "United Arab Emirates",
      "COUNTRY CODE": "971",
      "ISO CODES": "AE",

      "POPULATION": "4,975,593",
      "AREA KM2": "82,880",
    },
    {
      "COUNTRY": "United Kingdom",
      "COUNTRY CODE": "44",
      "ISO CODES": "GB",

      "POPULATION": "62,348,447",
      "AREA KM2": "244,820",
     
    },
    {
      "COUNTRY": "United States",
      "COUNTRY CODE": "1",
      "ISO CODES": "US",

      "POPULATION": "310,232,863",
      "AREA KM2": "9,629,091",
     
    },
    {
      "COUNTRY": "Uruguay",
      "COUNTRY CODE": "598",
      "ISO CODES": "UY",

      "POPULATION": "3,477,000",
      "AREA KM2": "176,220",
     
    },
    {
      "COUNTRY": "Uzbekistan",
      "COUNTRY CODE": "998",
      "ISO CODES": "UZ",

      "POPULATION": "27,865,738",
      "AREA KM2": "447,400",
     
    },
    {
      "COUNTRY": "Vanuatu",
      "COUNTRY CODE": "678",
      "ISO CODES": "VU",

      "POPULATION": "221,552",
      "AREA KM2": "12,200",
    },
     
    {
      "COUNTRY": "Vatican",
      "COUNTRY CODE": "379",
      "ISO CODES": "VA",

      "POPULATION": "921",
      "AREAKM2": "0",
    },
    {
     "COUNTRY": "Venezuela",
      "COUNTRY CODE": "58",
      "ISO CODES": "VE",

      "POPULATION": "27,223,228",
      "AREA KM2": "912,050",
     
    },
    {
      "COUNTRY": "Vietnam",
      "COUNTRY CODE": "84",
      "ISO CODES": "VN",

      "POPULATION": "89,571,130",
      "AREA KM2": "329,560",
    },
    {
      "COUNTRY": "Wallis and Futuna",
      "COUNTRY CODE": "681",
      "ISO CODES": "WF",

      "POPULATION": "16,025",
      "AREA KM2": "274",
    },
    {
     "COUNTRY": "Western Sahara",
      "COUNTRY CODE": "212",
      "ISO CODES": "EH",

      "POPULATION": "273,008",
      "AREA KM2": "266,000",
    },
    {
     "COUNTRY": "Yemen",
      "COUNTRY CODE": "967",
      "ISO CODES": "YE",

      "POPULATION": "23,495,361",
      "AREA KM2": "527,970",
     
    },
    {
      "COUNTRY": "Zambia",
      "COUNTRY CODE": "260",
      "ISO CODES": "ZM",

      "POPULATION": "13,460,305",
      "AREA KM2": "752,614",
     
    },
    {
      "COUNTRY": "Zimbabwe",
      "COUNTRY CODE": "263",
      "ISO CODES": "ZW",

      "POPULATION": "11,651,858",
      "AREA KM2": "390,580",
     
    }
   ]
export default function Country({setPhoneState,setISOCode,disabled}) {
    
    const isoref = useRef('')
    const handleChange = (e) =>{
        setPhoneState(`+${e.target.value}`)
    }
  return (
    <Select defaultValue={"Select Country"} disabled={disabled} style={{fontSize:'14px'}} name="x" onChange={handleChange} placeholder={"Select Country"}>
        {countries.map(country=>(
            <MenuItem value={country['ISO CODES']} className={country['COUNTRY CODE']}>
                <ListItemIcon>
                    <ReactCountryFlag  style={{fontSize:'2em'}}  countryCode={country['ISO CODES']}  />
                </ListItemIcon>
                {country.COUNTRY}
            </MenuItem>
        ))}
    </Select>    
  );
}
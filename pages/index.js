import { useState, useEffect } from "react";
import Head from "next/head";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";
// import Map from "../components/Map";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
});

const columns = [
    {
        name: "IP",
        selector: "ip",
        sortable: true,
    },
    {
        name: "Country",
        selector: "country",
        sortable: true,
    },
    {
        name: "City",
        selector: "city",
        sortable: true,
    },
    {
        name: "Site",
        selector: "from",
        sortable: true,
    },
    {
        name: "Browser",
        selector: "browser",
        sortable: true,
    },
    {
        name: "ISP",
        selector: "isp",
        sortable: true,
    },
    {
        name: "Date",
        selector: "createdAt",
        sortable: true,
        grow: 2,
    },
    {
        name: "Device",
        selector: "device",
        sortable: true,
        grow: 3,
    },
];

createTheme("dark0", {
    text: {
        primary: "#f2f2f2",
        secondary: "#ccc",
    },
    background: {
        // default: "#002b36",
        default: "#000",
    },
    context: {
        background: "#cb4b16",
        text: "#FFFFFF",
    },
    divider: {
        default: "#073642",
    },
    action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
    },
});

const Home = ({ visitors }) => {
    const [data, setData] = useState(visitors);
    const [search, setSearch] = useState("");

    const onSearch = e => {
        const { value } = e.target;
        setSearch(value);

        if (value === "") {
            return setData(visitors);
        }

        const regex = new RegExp(value, "i");

        const filtered = visitors.filter(v => {
            for (let key in v) {
                if (key === "useragent") continue;
                if (regex.test(v[key])) return true;
            }
            return false;
        });

        setData(filtered);
    };

    // console.log("visitors", visitors);
    return (
        <div>
            <Head>
                <title>Visitors</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
                    rel="stylesheet"
                />
            </Head>

            <main>
                <MapWithNoSSR />
                <div className="search-container">
                    <input
                        placeholder="Search"
                        id="search"
                        value={search}
                        onChange={onSearch}
                    />
                </div>
                <DataTable
                    noHeader={true}
                    data={data}
                    columns={columns}
                    theme={"dark0"}
                    // customStyles={customStyles}
                    pagination={true}
                />
            </main>
        </div>
    );
};

Home.getInitialProps = async function () {
    const url = "https://back.juannavas.dev/visitors";

    const visitors = (await axios.get(url)).data;

    return {
        visitors,
    };
};

export default Home;

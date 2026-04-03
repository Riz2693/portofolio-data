const fs = require("fs");
const path = require("path");
const si = require("simple-icons");

const outDir = path.join(process.cwd(), "public", "images", "tech");

const iconMap = {
    "python.svg": ["siPython"],
    "sql.svg": ["siMysql"],
    "javascript.svg": ["siJavascript"],
    "html5.svg": ["siHtml5"],
    "css3.svg": ["siCss"],
    "php.svg": ["siPhp"],
    "cplusplus.svg": ["siCplusplus"],
    "pandas.svg": ["siPandas"],
    "numpy.svg": ["siNumpy"],
    "jupyter.svg": ["siJupyter"],
    "tensorflow.svg": ["siTensorflow"],
    "scikitlearn.svg": ["siScikitlearn"],
    "matplotlib.svg": ["siMatplotlib"],
    "seaborn.svg": ["siSeaborn"],
    "keras.svg": ["siKeras"],
    "streamlit.svg": ["siStreamlit"],
    "tableau.svg": ["siTableau"],
    "powerbi.svg": ["siPowerbi"],
    "looker.svg": ["siLooker"],
    "microsoftexcel.svg": ["siMicrosoftexcel"],
    "postgresql.svg": ["siPostgresql"],
    "docker.svg": ["siDocker"],
    "googlecloud.svg": ["siGooglecloud"],
    "bigquery.svg": ["siGooglebigquery"],
    "bruin.svg": [],
    "kestra.svg": [],
    "rapidminer.svg": [],
    "dbeaver.svg": ["siDbeaver"],
    "mssql.svg": ["siMicrosoftsqlserver"],
    "git.svg": ["siGit"],
    "github.svg": ["siGithub"],
};

const fallbackUrls = {
    "matplotlib.svg": [
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/matplotlib.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/matplotlib/matplotlib-original.svg",
    ],
    "seaborn.svg": [
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/seaborn.svg",
        "https://raw.githubusercontent.com/konpa/devicon/master/icons/seaborn/seaborn-original.svg",
    ],
    "tableau.svg": [
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tableau.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/tableau/tableau-original.svg",
    ],
    "powerbi.svg": [
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/powerbi.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/powerbi/powerbi-original.svg",
    ],
    "microsoftexcel.svg": [
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoftexcel.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
    ],
    "mssql.svg": [
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoftsqlserver.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
    ],
    "bruin.svg": [],
    "kestra.svg": [],
    "rapidminer.svg": [],
};

function buildOfficialIcon(icon) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="${icon.title}">\n  <path fill="#${icon.hex}" d="${icon.path}"/>\n</svg>\n`;
}

async function fetchSvg(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": "portfolio-icon-sync/1.0",
            },
        });

        if (!response.ok) {
            return null;
        }

        const raw = await response.text();
        if (!raw.includes("<svg")) {
            return null;
        }

        return raw;
    } catch {
        return null;
    } finally {
        clearTimeout(timer);
    }
}

function resolveSimpleIcon(candidateKeys) {
    for (const key of candidateKeys) {
        if (key && si[key]) {
            return { icon: si[key], source: `simple-icons:${key}` };
        }
    }
    return null;
}

async function run() {
    fs.mkdirSync(outDir, { recursive: true });

    let generated = 0;
    let skipped = 0;

    for (const [filename, candidateKeys] of Object.entries(iconMap)) {
        const target = path.join(outDir, filename);

        const simpleIconResult = resolveSimpleIcon(candidateKeys);
        if (simpleIconResult) {
            fs.writeFileSync(target, buildOfficialIcon(simpleIconResult.icon), "utf8");
            generated++;
            continue;
        }

        const urlCandidates = fallbackUrls[filename] || [];
        let resolvedFromUrl = null;

        for (const url of urlCandidates) {
            const svgText = await fetchSvg(url);
            if (!svgText) {
                continue;
            }

            fs.writeFileSync(target, svgText, "utf8");
            resolvedFromUrl = url;
            break;
        }

        if (resolvedFromUrl) {
            generated++;
            continue;
        }

        skipped++;
    }

    console.log(`Generated ${generated} tech icons in ${outDir}`);
    if (skipped > 0) {
        console.log(`Skipped: ${skipped} icons (will display as broken images for debugging)`);
    }
}

run().catch((error) => {
    console.error("Failed to generate tech icons:", error);
    process.exitCode = 1;
});

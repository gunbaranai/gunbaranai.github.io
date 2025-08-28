import React from "react";
import { CodeXml, ExternalLink } from "lucide-react";
import { siGithub, siGmail, siFacebook, siX, siSteam, siGoogleplay, siItchdotio } from "simple-icons/icons";
import { tintSvg } from "./lib/utils";

const Portfolio: React.FC = () => {
    return (
        <div className="portfolio-page">
            {/* Left Sidebar */}
            <div className="portfolio-sidebar">
                <div className="text-center mb-8">
                    <div className="portfolio-sidebar-icon">
                        <CodeXml className="w-10 h-10" />
                    </div>
                    <h1 className="portfolio-sidebar-title">Muharrizk Abilaksana</h1>
                </div>
                <p className="text-black text-sm text-center m-0">Jakarta, Indonesia</p>
                <p className="text-black text-sm text-center m-8">
                    Programmer, specializes in web development, game scripting, and social media content
                </p>
                <div className="flex flex-row gap-2 justify-center items-center mt-4">
                    <a href="https://github.com/gunbaranai" target="_blank" className="text-black no-underline hover:text-gray-700">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(siGithub.svg)}`} alt="Github" className="w-6 h-6" />
                    </a>
                    <a href="mailto:ai.mo7g@gmail.com" target="_blank" className="portfolio-link">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(siGmail.svg)}`} alt="Gmail" className="w-6 h-6" />
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="portfolio-main">
                <h2 className="portfolio-h2">Skills</h2>
                <p className="mb-8 portfolio-text">
                    HTML5, CSS3, JavaScript<br />
                    React Framework<br />
                    Phaser.js<br />
                    Ruby Game Scripting System 3
                </p>

                <h2 className="portfolio-h2">Past Projects</h2>

                <h3 className="text-xl mb-3 text-white">Dragon Emperors</h3>
                <p className="mb-5 portfolio-text">
                    <a href="http://dragonemperors.com/" target="_blank" className="portfolio-link">
                        <ExternalLink className="w-5 h-5 inline align-text-bottom mr-1" />
                        Website
                    </a>
                    <a href="https://www.facebook.com/EmperorsDragon/" target="_blank" className="portfolio-link ml-3">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(tintSvg(siFacebook.svg, '#d1d5db'))}`} alt="Facebook" className="w-5 h-5 inline align-text-bottom mr-1" />
                        Facebook
                    </a>
                    <a href="#https://twitter.com/dragonemperorss" target="_blank" className="portfolio-link ml-3">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(tintSvg(siX.svg, '#d1d5db'))}`} alt="Twitter" className="w-5 h-5 inline align-text-bottom mr-1" />
                        Twitter
                    </a>
                </p>

                <h3 className="text-xl mb-3 text-white">Oracle of Forgotten Testament</h3>
                <p className="mb-5 portfolio-text">
                    <a href="https://store.steampowered.com/app/786510/" target="_blank" className="portfolio-link">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(tintSvg(siSteam.svg, '#d1d5db'))}`} alt="Steam" className="w-5 h-5 inline align-text-bottom mr-1" />
                        Steam
                    </a>
                    <a href="https://www.facebook.com/TouhouOracle/" target="_blank" className="portfolio-link ml-3">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(tintSvg(siFacebook.svg, '#d1d5db'))}`} alt="Facebook" className="w-5 h-5 inline align-text-bottom mr-1" />
                        Facebook
                    </a>
                </p>

                <h3 className="text-xl mb-3 text-white">Cursed Mansion</h3>
                <p className="mb-5 portfolio-text">
                    <a href="https://store.steampowered.com/app/967120/" target="_blank" className="portfolio-link">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(tintSvg(siSteam.svg, '#d1d5db'))}`} alt="Steam" className="w-5 h-5 inline align-text-bottom mr-1" />
                        Steam
                    </a>
                    <a href="https://www.facebook.com/cursed.mansion.game/" target="_blank" className="portfolio-link ml-3">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(tintSvg(siFacebook.svg, '#d1d5db'))}`} alt="Facebook" className="w-5 h-5 inline align-text-bottom mr-1" />
                        Facebook
                    </a>
                </p>

                <h3 className="text-xl mb-3 text-white">Tumbuk de Coffee</h3>
                <p className="mb-5 portfolio-text">
                    <a href="https://play.google.com/store/apps/details?id=com.tubruk.tubrukdecoffee" target="_blank" className="portfolio-link">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(tintSvg(siGoogleplay.svg, '#d1d5db'))}`} alt="GooglePlay" className="w-5 h-5 inline align-text-bottom mr-1" />
                        GooglePlay
                    </a>
                    <a href="https://www.facebook.com/NgopiBiarMelek/" target="_blank" className="portfolio-link ml-3">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(tintSvg(siFacebook.svg, '#d1d5db'))}`} alt="Facebook" className="w-5 h-5 inline align-text-bottom mr-1" />
                        Facebook
                    </a>
                    <a href="https://twitter.com/NgopiBiarMelek" target="_blank" className="portfolio-link ml-3">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(tintSvg(siX.svg, '#d1d5db'))}`} alt="Twitter" className="w-5 h-5 inline align-text-bottom mr-1" />
                        Twitter
                    </a>
                </p>

                <h3 className="text-xl mb-3 text-white">Lucerna Tenebris</h3>
                <p className="mb-5 portfolio-text">
                    <a href="https://dragonemperors.itch.io/lucernatenebris" target="_blank" className="portfolio-link">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(tintSvg(siItchdotio.svg, '#d1d5db'))}`} alt="GooglePlay" className="w-5 h-5 inline align-text-bottom mr-1" />
                        Itch.io
                    </a>
                </p>

                <h3 className="text-xl mb-3 text-white">Superfantasy @ Agate</h3>
                <p className="mb-8 portfolio-text">
                    <a href="https://superfantasy.com/" target="_blank" className="portfolio-link">
                        <ExternalLink className="w-5 h-5 inline align-text-bottom mr-1" />
                        Website
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Portfolio;

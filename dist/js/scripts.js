/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under Unlicensed (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector("#mainNav");
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove("navbar-shrink");
        } else {
            navbarCollapsible.classList.add("navbar-shrink");
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener("scroll", navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector("#mainNav");
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: "#mainNav",
            offset: 72,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector(".navbar-toggler");
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll("#navbarResponsive .nav-link")
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener("click", () => {
            if (window.getComputedStyle(navbarToggler).display !== "none") {
                navbarToggler.click();
            }
        });
    });

    // Add JotFormIFrame function
    var addJotFormIframe = function () {
        var ifr = document.getElementById("JotFormIFrame-221114284608046");
        if (ifr) {
            var src = ifr.src;
            var iframeParams = [];
            if (
                window.location.href &&
                window.location.href.indexOf("?") > -1
            ) {
                iframeParams = iframeParams.concat(
                    window.location.href
                        .substr(window.location.href.indexOf("?") + 1)
                        .split("&")
                );
            }
            if (src && src.indexOf("?") > -1) {
                iframeParams = iframeParams.concat(
                    src.substr(src.indexOf("?") + 1).split("&")
                );
                src = src.substr(0, src.indexOf("?"));
            }
            iframeParams.push("isIframeEmbed=1");
            ifr.src = src + "?" + iframeParams.join("&");
        }
        window.handleIFrameMessage = function (e) {
            if (typeof e.data === "object") {
                return;
            }
            var args = e.data.split(":");
            if (args.length > 2) {
                iframe = document.getElementById(
                    "JotFormIFrame-" + args[args.length - 1]
                );
            } else {
                iframe = document.getElementById("JotFormIFrame");
            }
            if (!iframe) {
                return;
            }
            switch (args[0]) {
                case "scrollIntoView":
                    iframe.scrollIntoView();
                    break;
                case "setHeight":
                    iframe.style.height = args[1] + "px";
                    break;
                case "collapseErrorPage":
                    if (iframe.clientHeight > window.innerHeight) {
                        iframe.style.height = window.innerHeight + "px";
                    }
                    break;
                case "reloadPage":
                    window.location.reload();
                    break;
                case "loadScript":
                    if (
                        !window.isPermitted(e.origin, [
                            "jotform.com",
                            "jotform.pro",
                        ])
                    ) {
                        break;
                    }
                    var src = args[1];
                    if (args.length > 3) {
                        src = args[1] + ":" + args[2];
                    }
                    var script = document.createElement("script");
                    script.src = src;
                    script.type = "text/javascript";
                    document.body.appendChild(script);
                    break;
                case "exitFullscreen":
                    if (window.document.exitFullscreen)
                        window.document.exitFullscreen();
                    else if (window.document.mozCancelFullScreen)
                        window.document.mozCancelFullScreen();
                    else if (window.document.mozCancelFullscreen)
                        window.document.mozCancelFullScreen();
                    else if (window.document.webkitExitFullscreen)
                        window.document.webkitExitFullscreen();
                    else if (window.document.msExitFullscreen)
                        window.document.msExitFullscreen();
                    break;
            }
            var isJotForm = e.origin.indexOf("jotform") > -1 ? true : false;
            if (
                isJotForm &&
                "contentWindow" in iframe &&
                "postMessage" in iframe.contentWindow
            ) {
                var urls = {
                    docurl: encodeURIComponent(document.URL),
                    referrer: encodeURIComponent(document.referrer),
                };
                iframe.contentWindow.postMessage(
                    JSON.stringify({ type: "urls", value: urls }),
                    "*"
                );
            }
        };
        window.isPermitted = function (originUrl, whitelisted_domains) {
            var url = document.createElement("a");
            url.href = originUrl;
            var hostname = url.hostname;
            var result = false;
            if (typeof hostname !== "undefined") {
                whitelisted_domains.forEach(function (element) {
                    if (
                        hostname.slice(-1 * element.length - 1) ===
                            ".".concat(element) ||
                        hostname === element
                    ) {
                        result = true;
                    }
                });
                return result;
            }
        };
        if (window.addEventListener) {
            window.addEventListener("message", handleIFrameMessage, false);
        } else if (window.attachEvent) {
            window.attachEvent("onmessage", handleIFrameMessage);
        }
    };

    // Add JotFormIFrame
    addJotFormIframe();
});

// ==UserScript==
// @name            DBLP bibtex link
// @namespace       http://www-mmm.is.s.u-tokyo.ac.jp/~shunsuke/
// @description     Create a downlod link to the DBLP's bibtex on various database website.
// @license         MIT/X11
// @include         http://www.sciencedirect.com/science/article/pii/*
// @include         https://www.sciencedirect.com/science/article/pii/*
// @include         http://ieeexplore.ieee.org/xpl/articleDetails.jsp?*
// @include         https://ieeexplore.ieee.org/xpl/articleDetails.jsp?*
// @include         http://dl.acm.org/catation.cfm?*
// @include         https://dl.acm.org/catation.cfm?*
// @include         http://link.springer.com/chapter/*
// @include         https://link.springer.com/chapter/*
// ==/UserScript==

(function() {
	var doiXPath, titleXPath, authorsXPath;
	switch(document.location.hostname) {
	case "www.sciencedirect.com":
		doiXPath     = "id('ddDoi')/text()";
		titleXPath   = "//h1[@class='svTitle']/text()";
		authorsXPath = "//a[@class='authorName svAuthor']/text()";
		exportXPath  = "//li[@class='exportPopupListitem']";
		break;
	case "ieeexplore.ieee.org":
		doiXPath     = "//meta[@name='citation_doi']/@content";
		titleXPath   = "//meta[@name='citation_title']/@content";
		authorsXPath = "//meta[@name='citation_author']/@content";
		exportXPath  = "id('action-download-document-citations')";
		break;
	case "dl.acm.org":
		doiXPath     = "//meta[@name='citation_doi']/@content";
		titleXPath   = "//meta[@name='citation_title']/@content";
		authorsXPath = "//a[@title='Author Profile Page']/text()";
		break;
	case "link.springer.com":
		doiXPath     = "//meta[@name='citation_doi']/@content";
		titleXPath   = "//meta[@name='citation_title']/@content";
		authorsXPath = "//meta[@name='citation_author']/@content";
		exportXPath  = "id('export-citation')/..";
		break;
	}

	doi = document.evaluate(doiXPath, document, null, XPathResult.STRING_TYPE);
	title = document.evaluate(doiXPath, document, null, XPathResult.STRING_TYPE);
	authors = document.evaluate(doiXPath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);

	box = 

	function constructDBLPList(html) {
		var pubs = document.evaluate("//ul[@class='publ-list']", html, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
		if (pubs && pubs.firstChild) {
			return pubs;
		} else {
			pubs.setAttribute("style",)
		}
		var e;
		while ((e = pubs.iteratorNext())) {
			listElem.appendChild(e);
		}
		listElem.setAttribute("class", );
	}

	function listfetch(urlgen) {
		return function (fallback) {
			var url = urlgen();
			if url {
				GM_xmlhttpRequest({
					url: urlgen(),
					onload: function() {
						var list = constructDBLPList(res.responseText);
						if (list) {
							box.replaceChild(list, box.firstChild);
						} else {
							fallback();
						}
					},
					onerror: function() {
						box.textContent = "dblpbib: error";
					},
					onabort : function() {
						box.textContent = "dblpbib: abort";
					},
					ontimeout : function() {
						box.textContent = "dblpbib: timeout";
					}
				});
			} else {
				fallback();
			}
		}
	}

	var listfetchbydoi = listfetch(function() {
		return doi ? "http://dblp.uni-trier.de/doi?doi="+doi : null;
	});
	var listfetchbyinfo = listfetch(function() {
		return "http://dblp.uni-trier.de/doi?doi="+doi;
	});
	var notfound = function() {
		box.textContent = "dblpbib: not found";
	}

	listfetchbydoi(function() { listfetchbyinfo(notfound()); });
})();

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

	function constructDBLPList() {
		pubs = document.evaluate("//ul[@class='publ-list']//div[@class='data']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
		var listElem = document.createElement('ul');
	}

	function(get)
	GM_xmlhttpRequest({
		http://dblp.uni-trier.de/rec/bib1/conf/fossacs/HasuoJS08.bib
		http://dblp.uni-trier.de/doi?doi=
		method: 'GEt',,
		url: 'lj'
		onload: function(res) {

			if @s
		}
	})
})();

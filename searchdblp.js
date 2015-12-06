(function() {
	var doiXPath, titleXPath, authorsXPath;
	switch (window.location.hostname) {
	case "www.sciencedirect.com":
		doiXPath     = "id('ddDoi')/text()";
		titleXPath   = "//h1[@class='svTitle']/text()";
		authorsXPath = "//a[@class='authorName svAuthor']/text()";
		break;
	case "ieeexplore.ieee.org":
		doiXPath     = "//meta[@name='citation_doi']/@content";
		titleXPath   = "//meta[@name='citation_title']/@content";
		authorsXPath = "//meta[@name='citation_author']/@content";
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
		break;
	default:
		return;
	}

	var doi = document.evaluate(doiXPath, document, null, XPathResult.STRING_TYPE, null);
	var title = document.evaluate(titleXPath, document, null, XPathResult.STRING_TYPE, null);
	var authors = document.evaluate(authorsXPath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

	var url;
	if (doi.stringValue) {
		url = "http://dblp.uni-trier.de/doi?doi="+encodeURIComponent(doi.stringValue);
	} else {
		var terms = [];
		if (title.stringValue) terms.push(title.stringValue);
		for (var author; (author = authors.iterateNext()); terms.push(author.textContent));
		if (terms.length) url = "http://dblp.uni-trier.de/search?q="+encodeURIComponent(terms.join('+'));
	}
	if (!url) return;

	window.location = url;
})();

YUI := java -jar yuicompressor-2.4.8.jar
ITEMS := searchdblp
COMMIT := $(shell git log -1 --format=%h)
ARCHIVE := bookmarklets-$(COMMIT).zip

bookmarklets.html: template.erb $(ITEMS:=.html) $(ITEMS:=.url) $(ARCHIVE)
	ITEMS="$(ITEMS)" ARCHIVE="$(ARCHIVE)" erb -T - template.erb > $@

$(ARCHIVE):
	git archive --format=zip --prefix=bookmarklets/ HEAD -o $@

%.html: %.md
	pandoc -t html5 --base-header-level=2 -o $@ $<

%.url: %.js
	printf 'javascript:' > $@
	$(YUI) $< >> $@

.PHONY: clean
clean:
	rm -f *.html *.url *.zip

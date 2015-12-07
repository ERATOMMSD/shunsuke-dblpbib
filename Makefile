YUI := java -jar yuicompressor-2.4.8.jar
ITEMS := searchdblp
COMMIT := $(shell git log -1 --format=%h)
DATE := $(shell git log -1 --date=iso --format=%ad)
ARCHIVE := bookmarklets-$(COMMIT).zip

index.html: template.erb $(ITEMS:=.html) $(ITEMS:=.min.js) $(ARCHIVE)
	ITEMS="$(ITEMS)" ARCHIVE="$(ARCHIVE)" DATE="$(DATE)" erb -T - template.erb > $@

$(ARCHIVE):
	git archive --format=zip --prefix=bookmarklets/ --worktree-attributes HEAD -o $@

%.html: %.md
	pandoc -t html5 --base-header-level=2 -o $@ $<

%.min.js: %.js
	$(YUI) $< > $@

.PHONY: clean
clean:
	rm -f *.html *.min.js *.zip


test:
	@./support/expresso/bin/expresso \
		-I lib

docs:
	dox \
		--title "Soda" \
		--desc "Selenium Node Adapter" \
		--ribbon "http://github.com/learnboost/soda" \
		--private \
		lib/soda/*.js > index.html

docclean:
	rm -f index.html

.PHONY: test docs docclean
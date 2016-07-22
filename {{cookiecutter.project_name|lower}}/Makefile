comma:= ,
empty:=
space:= $(empty) $(empty)

# Sometimes, use `gsed` if you use Mac OS X
GNU_SED=sed

TARGET_DIR = dist
PROJECT_NAMESPACE = {{cookiecutter.package_name|lower}}

NODE_DIR = node_modules

SOY_DIR = soy
SOY_SOURCES = $(shell find $(SOY_DIR) -type f -name '*.soy')

.DELETE_ON_ERROR:

.SILENT:

# Delete the default suffixes for old-fashioned suffix rules
.SUFFIXES:

.PHONY: all clean

all: html css js

##############
# HTML RULES #
##############

HTML_TARGET_DIR = $(TARGET_DIR)

SOY_PAGE_DIR = soy_page
SOY_PAGE_SOURCES = $(shell find $(SOY_PAGE_DIR) -type f -name '*.soy')
SOY_PAGE_TARGETS = $(patsubst $(SOY_PAGE_DIR)/%.soy,$(HTML_TARGET_DIR)/%.html,$(SOY_PAGE_SOURCES))
SOY_JAR = $(NODE_DIR)/google-closure-templates/java/Soy.jar
SOY_NAMESPACE = $(PROJECT_NAMESPACE).page

html: $(SOY_PAGE_TARGETS)
	echo "[Finished] $@"

$(HTML_TARGET_DIR)/%.html: $(SOY_PAGE_DIR)/%.soy $(SOY_SOURCES)
	-mkdir -p $(dir $@)
	jjs -cp $(SOY_JAR) "compile-soy-page.js" -- \
		"$(SOY_NAMESPACE).$(subst /,.,$*)" \
		"compile-time-globals.txt" \
		$< $(SOY_SOURCES) \
		> $@

#############
# CSS RULES #
#############

CSS_TARGET_DIR = $(TARGET_DIR)/css

LESS_DIR = less
LESS_SOURCES = $(shell find $(LESS_DIR) \( -path '$(LESS_DIR)/includes' -prune -o -name '*.less' \) -type f)
LESS_TARGETS = $(patsubst $(LESS_DIR)/%.less,$(CSS_TARGET_DIR)/%.css,$(LESS_SOURCES))

css: $(LESS_TARGETS)
	echo "[Finished] $@"

$(CSS_TARGET_DIR)/%.css: $(LESS_DIR)/%.less
	-mkdir -p $(dir $@)
	lessc --strict-imports --clean-css $< > $@
	# generate dependencies
	lessc -M $< $@ > $(CSS_TARGET_DIR)/$*.d
	# add rules to ignore missing prerequisites
	$(GNU_SED) -e 's/^[^:]*: *//' < $(CSS_TARGET_DIR)/$*.d | \
		tr -s ' ' '\n' | \
		$(GNU_SED) -e 's/.\+/\0:/g' \
		>> $(CSS_TARGET_DIR)/$*.d

-include $(LESS_TARGETS:.css=.d)

############
# JS RULES #
############

JS_TARGET_DIR = $(TARGET_DIR)/js

JS_DIR = js
JS_SOURCES = $(shell find $(JS_DIR) -type f -name '*.js')
JS_LIBRARY_DIR = js-lib
JS_TARGETS = $(patsubst $(JS_DIR)/%.js,$(JS_TARGET_DIR)/%.js,$(JS_SOURCES))
CLOSURE_COMPILER = $(NODE_DIR)/google-closure-compiler/compiler.jar
CLOSURE_COMPILATION_LEVEL = ADVANCED_OPTIMIZATIONS
#CLOSURE_COMPILATION_LEVEL = SIMPLE_OPTIMIZATIONS
#CLOSURE_COMPILATION_LEVEL = WHITESPACE_ONLY

js: $(JS_TARGETS)
	echo "[Finished] $@"

$(JS_TARGET_DIR)/%.js: $(JS_DIR)/%.js eslint
	-mkdir -p $(dir $@)
	find $(JS_LIBRARY_DIR) -type f | xargs cat $< | java -jar $(CLOSURE_COMPILER) \
		--language_in ECMASCRIPT6_STRICT \
		--language_out ECMASCRIPT5_STRICT \
		--compilation_level $(CLOSURE_COMPILATION_LEVEL) \
		--jscomp_error=checkEventfulObjectDisposal \
		--jscomp_error=checkRegExp \
		--jscomp_error=checkTypes \
		--jscomp_error=conformanceViolations \
		--jscomp_error=constantProperty \
		--jscomp_error=const \
		--jscomp_error=missingProperties \
		--jscomp_error=missingProvide \
		--jscomp_error=missingRequire \
		--jscomp_error=missingReturn \
		--jscomp_error=missingRequire \
		--jscomp_error=visibility \
		> $@

eslint:
	eslint $(JS_DIR) $(JS_LIBRARY_DIR)

###############
# CLEAN RULES #
###############

clean:
	-rm -rf $(TARGET_DIR)


comma:= ,
empty:=
space:= $(empty) $(empty)

TARGET_DIR = dist
INTERMEDIATE_DIR = inter
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
	jjs -cp $(SOY_JAR) compile-soy-page.js -- \
		$(SOY_NAMESPACE).$(subst /,.,$*) \
		$< $(SOY_SOURCES) \
		> $@

#############
# CSS RULES #
#############

CSS_TARGET_DIR = $(TARGET_DIR)/css

LESS_DIR = less
LESS_SOURCES = $(shell find $(LESS_DIR) \( -path '$(LESS_DIR)/includes' -prune -o -name '*.less' \) -type f)
LESS_TARGETS = $(patsubst $(LESS_DIR)/%.less,$(CSS_TARGET_DIR)/%.css,$(LESS_SOURCES))

NORMALIZE_CSS_TARGET = $(CSS_TARGET_DIR)/normalize.css
NORMALIZE_CSS_SOURCE = $(NODE_DIR)/normalize.css/normalize.css

css: $(LESS_TARGETS) $(NORMALIZE_CSS_TARGET)
	echo "[Finished] $@"

$(CSS_TARGET_DIR)/%.css: $(LESS_DIR)/%.less
	-mkdir -p $(dir $@)
	lessc --strict-imports --clean-css $< > $@
	# generate dependencies
	lessc -M $< $@ > $(CSS_TARGET_DIR)/$*.d
	# add rules to ignore missing prerequisites
	sed -e 's/^[^:]*: *//' < $(CSS_TARGET_DIR)/$*.d | \
		tr -s ' ' '\n' | \
		sed -e 's/.\+/\0:/g' \
		>> $(CSS_TARGET_DIR)/$*.d

$(NORMALIZE_CSS_TARGET): $(NORMALIZE_CSS_SOURCE)
	cp $(NORMALIZE_CSS_SOURCE) $(NORMALIZE_CSS_TARGET)

-include $(LESS_TARGETS:.css=.d)

############
# JS RULES #
############

JS_TARGET_DIR = $(TARGET_DIR)/js

CLOSURE_DIR = js
CLOSURE_SOURCES = $(shell find $(CLOSURE_DIR) -type f -name '*.js' | xargs grep -l "\\.main =")
CLOSURE_TARGETS = $(patsubst $(CLOSURE_DIR)/%.js,$(JS_TARGET_DIR)/%.js,$(CLOSURE_SOURCES))
CLOSURE_COMPILER = $(NODE_DIR)/google-closure-compiler/compiler.jar
CLOSURE_LIBRARY = $(NODE_DIR)/google-closure-library
CLOSURE_BUILDER = $(CLOSURE_LIBRARY)/closure/bin/build/closurebuilder.py
CLOSURE_COMPILATION_LEVEL = ADVANCED_OPTIMIZATIONS
#CLOSURE_COMPILATION_LEVEL = SIMPLE_OPTIMIZATIONS
#CLOSURE_COMPILATION_LEVEL = WHITESPACE_ONLY

SOY_TARGET = $(INTERMEDIATE_DIR)/soy/compiled.js
SOY_TO_JS_COMPILER = $(NODE_DIR)/google-closure-templates/javascript/SoyToJsSrcCompiler.jar

js: $(CLOSURE_TARGETS)
	echo "[Finished] $@"

#  closurebuilder.py | grep -v '^node_modules' | tr '\n' ' '
$(JS_TARGET_DIR)/%.js: $(CLOSURE_DIR)/%.js $(SOY_TARGET)
	eslint $<
	-mkdir -p $(dir $@)
	java -jar $(CLOSURE_COMPILER) \
		--js "$(CLOSURE_LIBRARY)/**.js" \
		--js "$(CLOSURE_DIR)/**.js" \
		--js "$(NODE_DIR)/google-closure-templates/javascript/soyutils_usegoog.js" \
		--js "$(SOY_TARGET)" \
		--language_in ECMASCRIPT5 \
		--compilation_level $(CLOSURE_COMPILATION_LEVEL) \
		--dependency_mode=STRICT \
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
		--entry_point="goog:$(subst /,.,$*).main" \
		> $@
	# generate dependencies
	python $(CLOSURE_BUILDER) \
		--root "$(CLOSURE_LIBRARY)/closure" \
		--root "$(CLOSURE_LIBRARY)/third_party" \
		--root "$(CLOSURE_DIR)" \
		--root "$(SOY_DIR)" \
		--root "$(NODE_DIR)/google-closure-templates/javascript" \
		-n "$(subst /,.,$*).main" 2>/dev/null \
		| grep -v '^node_modules' \
		| tr '\n' ' ' \
		> $(JS_TARGET_DIR)/$*.d
	sed -i'' -e 's!^!$@: !g' $(JS_TARGET_DIR)/$*.d

-include $(CLOSURE_TARGETS:.js=.d)

soy: $(SOY_TARGET)

$(SOY_TARGET): $(SOY_SOURCES)
	-mkdir -p $(dir $@)
	java -jar $(SOY_TO_JS_COMPILER) \
		--cssHandlingScheme GOOG \
		--outputPathFormat $@ \
		--shouldGenerateJsdoc \
		--shouldProvideRequireSoyNamespaces \
		--srcs $(subst $(space),$(comma),$(SOY_SOURCES))

###############
# CLEAN RULES #
###############

clean:
	-rm -rf $(TARGET_DIR) $(INTERMEDIATE_DIR)


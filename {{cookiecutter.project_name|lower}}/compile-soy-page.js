var File = Java.type('java.io.File');
var SoyFileSet = Java.type('com.google.template.soy.SoyFileSet');
var SoyTofu = Java.type('com.google.template.soy.tofu.SoyTofu');

var sfsBuilder = SoyFileSet.builder();

sfsBuilder.setCompileTimeGlobals(new File(arguments[1]));

for (var i = 2; i < arguments.length; ++i) {
	sfsBuilder.add(new File(arguments[i]));
}

var tofu = sfsBuilder.build().compileToTofu();
print(tofu.newRenderer(arguments[0]).render())

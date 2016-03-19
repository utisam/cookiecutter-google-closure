var SoyFileSet = Java.type('com.google.template.soy.SoyFileSet');
var SoyTofu = Java.type('com.google.template.soy.tofu.SoyTofu');
var File = Java.type('java.io.File');

var sfsBuilder = SoyFileSet.builder();
for (var i = 1; i < arguments.length; ++i) {
	sfsBuilder.add(new File(arguments[i]));
}

var tofu = sfsBuilder.build().compileToTofu();
print(tofu.newRenderer(arguments[0]).render())

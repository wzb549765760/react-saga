const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    // 实现 antd 的按需加载
    fixBabelImports('antd', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        /**
           style: true 表示 less 样式文件格式
           style: 'css' 表示 css 样式文件格式
        */
        style: true,
    }),
    addLessLoader({
        // true 表示支持 less 样式文件格式
        javascriptEnabled: true, 
    })
);
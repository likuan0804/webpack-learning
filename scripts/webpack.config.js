//向外包容node的配置
const path = require('path'); // 原生的nodejs路径解析模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 
 * 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
  可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: './src/index.js', // 入口可以有多个
  output: {
    // webpack 如何输出结果的相关选项
    path:path.resolve(process.cwd(), "dist"), // string (default)
    // __dirname node写法当前目录
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: "js/[name].[hash:6].js", // string (default)  // 输出的文件名
    // 1.hash生成hash值避免缓存， 2.chunkHash生成多个入口不同的hash 3.contentHash 根据内容计算出的hash值
    /**
     * assets和static两个都是用于存放静态资源文件。
      放在static中的文件不会进行构建编译处理，也就不会压缩体积，在打包时效率会更高，但体积更大在服务器中就会占据更大的空间
      放在assets中的文件会进行压缩体积、代码格式化，压缩后会放置在static中一同上传服务器。
      因此建议样式文件放在assets中进行打包，引入的第三方文件放到static中，因为引入的文件已经做过打包处理
     */
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ],// 先写的后执行，先用css侯勇style
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          // "less-loader"
          {
            loader: "less-loader"
          }
        ],// 先写的后执行，先用css侯勇style
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              limit: 194305 
            },
          },
        ],
      },
    ],
  },
  devServer: {
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    // compress: true,
    port: 9000,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:'webpack',
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],

}
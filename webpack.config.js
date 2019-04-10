//引用path模組
const path = require('path');
module.exports = {
    mode: 'production',
    //如果有一個以上的檔案需要打包，可以傳陣列給entry
    entry: {
        index: ['./src/index.js', './stylesheet/index.css']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    //將loader的設定寫在module的rules屬性中
    module: {
        //rules的值是一個陣列可以存放多個loader物件
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-react', '@babel/preset-env'] }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },
    //增加一個給devserver的設定
    devServer: {
        //指定開啟port為9000
        port: 5500
    }
};
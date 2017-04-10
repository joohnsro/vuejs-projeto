/*******************************************************************************************/

INSTALAÇÃO BÁSICA

01 - Instalar/Atualizar o nodejs:
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs

02 - Instalar webpack:
    sudo npm install -g webpack

03 - Instalar babel-loader:
    npm install babel-loader babel-core babel-preset-es2015 --save-dev --no-bin-link

04 - Instalar css-loader:
    npm install css-loader --save-dev --no-bin-link

05 - Instalar url-loader:
    npm install url-loader --save-dev --no-bin-link

06 - Instalar file-loader:
    npm install file-loader --save-dev --no-bin-link

07 - Instalar sass-loader:
    npm install sass-loader node-sass webpack --save-dev --no-bin-link

08 - Instalar webpack-dev-server:
    sudo npm install -g webpack-dev-server

09 - Instalar plugin que extrai css do arquivo de javascript:
    npm install extract-text-webpack-plugin --save-dev --no-bin-link

10 - Instalar vue-loader:
    npm install babel-plugin-transform-runtime vue-loader@8.5.3 vue-hot-reload-api@1.3.3 vue-html-loader vue-style-loader --save-dev --no-bin-link


/*******************************************************************************************/

CONFIGURAÇÃO BÁSICA

01 - Criação de arquivo webpack.config.js com as configurações:
    var webpack = require('webpack');
    var ExtractPlugin = require('extract-text-webpack-plugin');
    var extractCSS = new ExtractPlugin('css/app.css');

    module.exports = {
        devtool: 'source-map',
        entry: './src/js/main.js',
        output: {
            path: __dirname + '/dist',
            filename: 'app.bundle.js',
            publicPath: '/dist/'
        },
        plugins: [
            new webpack.ProvidePlugin({
                'window.$': 'jquery',
                'window.jQuery': 'jquery'
            }),
            extractCSS,
            new webpack.HotModuleReplacementPlugin()
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.(woff|woff2|ttf|svg|eot)$/,
                    loader: 'url-loader?limit=100000'
                },
                {
                    test: /\.scss$/,
                    loader: extractCSS.extract(['css-loader','sass-loader'])
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        },
        devServer: {
            host: '0.0.0.0',
            inline: true,
            watchOptions: {
                poll: true,
                aggregateTimeout: 300
            }
        }
    };


/*******************************************************************************************/

RODANDO APLICAÇÃO

01 - Criar arquivos com o seguinte código:
    webpack

02 - Rodar aplicação com a função watch e observando o progresso do carregamento da aplicação:
    webpack-dev-server --progress
import { Request, ResponseToolkit } from '@hapi/hapi';

export const getHtmlPage = () => {
    return {
        name: 'GetHtmlRoot',
        version: '1.0.0',
        register: async function(server) {
          server.route({
            method: 'GET',
            path: '/',
            handler: function(req, h) {
                return `
                    <!doctype html>
                    <html>
                    <head>
                        <title>Demo</title>
                        <style>
                        body {
                            font-size: 1.5rem;
                        }
                        button, input { font-size: 1.2rem;}
                        form {
                            display: flex;
                            flex-direction: column;
                            width: 300px;
                        }
                        </style>
                    </head>
                    <body>
                        <form action="stats">
                            <label>Search player stats by name:</label>
                            <input name="search" type="search">
                            <button>Go</button>
                        </form>
                    </body>
                    </html>
                `
            },
            options: { cors: true }
          });
        }
      };
}
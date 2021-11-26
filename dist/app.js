"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const os_1 = __importDefault(require("os"));
const index_1 = __importDefault(require("./routes/index"));
const books_1 = __importDefault(require("./routes/books"));
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: ["https://week-6-task.herokuapp.com/"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(function (req, res, next) {
    console.log(`Operating system details: Type: ${os_1.default.type()}, Platform: ${os_1.default.platform()})`);
    console.log(`User Hostname: ${os_1.default.hostname()}`);
    console.log(`Network details: ${os_1.default.networkInterfaces()}`);
    console.log(`Network details: ${os_1.default.cpus()[0]}`);
    console.log(JSON.stringify(req.headers, null, 3));
    console.log(JSON.stringify(res.header), null, 3);
    next();
});
app.use('/', index_1.default);
app.use('/books', books_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// app.get('/', () => console.log('Hello World'))
// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
exports.default = app;
//# sourceMappingURL=app.js.map
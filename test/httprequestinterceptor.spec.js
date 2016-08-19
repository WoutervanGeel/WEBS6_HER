describe("Test Interceptor", function () {
    var HttpRequstInterceptor;
    var httpProvider;
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImF3LnZhbnppamRlcnZlbGRAc3R1ZGVudC5hdmFucy5ubCI.txmm99ugNNJkM_3fFRjeZid9cxrDUAWQKfVjgK24hPs';
    var username = 'aw.vanzijderveld@student.avans.nl'

    beforeEach(module('webs6'));

    beforeEach(inject(function (_HttpRequestInterceptor_) {
        HttpRequstInterceptor = _HttpRequestInterceptor_;

    }));

    it('should return config with token and username', function (done) {
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        config = {};
        config = HttpRequstInterceptor.request({ headers: {} });
        expect(config.headers['x-username']).to.equals(username);
        expect(config.headers['x-token']).to.equals(token);
        done();
    });

});
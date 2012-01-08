var leisure = require('../');

var req;
var res;

describe('leisure', function() {
  describe('#accept', function() {
    beforeEach(function() {
      var acceptHeader = 'vnd.shop.Order+json, vnd.shop.Order+xml, text/xml';
      req = { headers: { accept: acceptHeader } };
      res = { headers: { 'content-type': '' } };
    });

    it('should add an `accepted` property to the request', function(done) {
      var accept = leisure.accept([{ contentType: 'text/xml' }]);
      var next = function() {
        req.accepted.should.be.a('object');
        req.accepted.should.have.property('contentType');
        req.accepted.should.have.property('format');
        done();
      };

      accept(req, res, next);
    });

    it('should accept single matching media types with no format specified', function(done) {
      var mediaTypes = [{ contentType: 'vnd.shop.Order' }];
      var accept = leisure.accept(mediaTypes);
      req.headers['accept'] = 'vnd.shop.Order';

      var next = function() {
        req.accepted.contentType.should.equal('vnd.shop.Order');
        done();
      };

      accept(req, res, next);
    });

    it('should accept single matching media types with formats specified', function(done) {
      var mediaTypes = [{ contentType: 'vnd.shop.Order', formats: ['json', 'xml'] }];
      var accept = leisure.accept(mediaTypes);
      req.headers['accept'] = 'vnd.shop.Order+json';

      var next = function() {
        req.accepted.contentType.should.equal('vnd.shop.Order');
        req.accepted.format.should.equal('json');
        done();
      };

      accept(req, res, next);
    });

    it('should set the response content-type to the appropriate media type', function(done) {
      var mediaTypes = [{ contentType: 'text/xml' }];
      var accept = leisure.accept(mediaTypes);
      req.headers['accept'] = 'text/xml';

      var next = function() {
        res.headers['content-type'].should.equal('text/xml');
        done();
      };

      accept(req, res, next);
    });
  });
});

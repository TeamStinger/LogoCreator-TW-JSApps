define(['chai', 'sinon', 'utils/viewRenderer'], function (chai, sinon, viewRenderer) {
    var expect = chai.expect;

    describe('ViewRenderer', function () {
        describe('compileTemplate method', function () {
            it('should compile template with no data', function () {
                var template = '<div class="template">Hello from compileTemplate function</div>';

                var compiledTemplate = viewRenderer.compileTemplate(template, {});

                expect(compiledTemplate).to.be.equal(template);
            });

            it('should compile template with plain data', function () {
                var template = '<div class="template">{{title}}</div>';

                var compiledTemplate = viewRenderer.compileTemplate(template, { title: 'Hello from compileTemplate' });

                expect(compiledTemplate).to.be.equal('<div class="template">Hello from compileTemplate</div>');
            });

            it('should compile template with conditional expression', function () {
                var template = '<div class="template">{{#if condition}}{{title}}{{/if}}</div>';

                var compiledTemplate = viewRenderer.compileTemplate(template, { title: 'Hello from compileTemplate', condition: true });

                expect(compiledTemplate).to.be.equal('<div class="template">Hello from compileTemplate</div>');
            });

            it('should compile loop data', function () {
                var template = '<div class="template">{{#each words}}{{this}} {{/each}}</div>';

                var compiledTemplate = viewRenderer.compileTemplate(template, { words: ['Hello', 'from', 'compileTemplate'] });

                expect(compiledTemplate).to.be.equal('<div class="template">Hello from compileTemplate </div>');
            })
        });

        describe('appendToDOM method', function () {
            beforeEach(function () {
                $('<div id="view">').appendTo(document.body);
            });

            afterEach(function () {
                $('#view').remove();
            });

            it('should call the compileTemplate method only once', function () {
                var template = '<div class="template">{{title}}</div>';
                var compileTemplateSpy = sinon.spy(viewRenderer, 'compileTemplate');

                viewRenderer.appendToDOM('#view', template, { title: 'Hello from appendToDOM' });

                expect(compileTemplateSpy.calledOnce).to.be.true;

                compileTemplateSpy.restore();
            });

            it('should call the compileTemplate method with correct params', function () {
                var template = '<div class="template">{{title}}</div>';
                var data = { title: 'Hello from appendToDOM' };
                var compileTemplateSpy = sinon.spy(viewRenderer, 'compileTemplate');

                viewRenderer.appendToDOM('#view', template, data);

                expect(compileTemplateSpy.calledWithExactly(template, data)).to.be.true;

                compileTemplateSpy.restore();
            });

            it('should append html to element', function () {
                var template = '<div class="template">{{title}}</div>';
                var data = { title: 'Hello from appendToDOM' };

                viewRenderer.appendToDOM('#view', template, data);
                viewRenderer.appendToDOM('#view', template, data);

                expect($('#view').find('.template').length).to.be.equal(2);
            });
        });

        describe('render method', function () {
            beforeEach(function () {
                $('<div id="view">').appendTo(document.body);
            });

            afterEach(function () {
                $('#view').remove();
            });

            it('should call the compileTemplate method only once', function () {
                var template = '<div class="template">{{title}}</div>';
                var compileTemplateSpy = sinon.spy(viewRenderer, 'compileTemplate');

                viewRenderer.render('#view', template, { title: 'Hello from render' });

                expect(compileTemplateSpy.calledOnce).to.be.true;

                compileTemplateSpy.restore();
            });

            it('should call the compileTemplate method with correct params', function () {
                var template = '<div class="template">{{title}}</div>';
                var data = { title: 'Hello from render' };
                var compileTemplateSpy = sinon.spy(viewRenderer, 'compileTemplate');

                viewRenderer.render('#view', template, data);

                expect(compileTemplateSpy.calledWithExactly(template, data)).to.be.true;

                compileTemplateSpy.restore();
            });

            it('should render to element', function () {
                var template = '<div class="template">{{title}}</div>';
                var data = { title: 'Hello from render' };

                viewRenderer.render('#view', template, data);
                expect($('#view').find('.template').length).to.be.equal(1);
                viewRenderer.render('#view', template, data);
                expect($('#view').find('.template').length).to.be.equal(1);
            });
        });
    })
});
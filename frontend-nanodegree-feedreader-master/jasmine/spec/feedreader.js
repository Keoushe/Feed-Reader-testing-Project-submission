/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  describe('RSS Feeds', function() {
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });




    //loops over array checking for url
    it('each has url', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.constructor).toBe(String);
        expect(feed.url.length).not.toBe(0);
      }
    });


    //loops over allFeeds checking they each have names
    it('each has name & loops', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.constructor).toBe(String);
        expect(feed.name.length).not.toBe(0);
      }
    });

  });

  //menu suite
  describe('The menu', function() {
    //select menu-hidden class check if it's class is contained
    it('hidden by default', function() {
      let isHidden = document.body.classList.contains('menu-hidden');
      expect(isHidden).toBe(true);
    });


    it('toggles view when icon is clicked', function() {
      let menuIcon = document.querySelector('a.menu-icon-link');
      menuIcon.click();
      expect(document.body.classList.contains('menu-hidden')).toBe(false);
      menuIcon.click();
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });

  });

  //Initial Entries suite
  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(1, done);
    });


    it('has entries in feed container', function() {
      let feedContainer = document.querySelector('div.feed');
      let entries = feedContainer.querySelectorAll('article.entry');
      expect(entries.length).toBeGreaterThan(0);
    });
  });

  describe('New Feed Selection', function() {
    let firstFeed, secondFeed;

    beforeEach(function(done) {
      loadFeed(3, function() {
        firstFeed = document.querySelector('div.feed').innerHTML;
        loadFeed(2, function() {
          secondFeed = document.querySelector('div.feed').innerHTML;
          done();
        });
      });
    });

    it('loads new feeds', function() {
      expect(firstFeed).not.toBe(secondFeed);
    });
  });

}());

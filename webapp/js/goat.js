//main goat application file
//TODO: reorg

/* ### GOAT CONTROLLERS ### */

/** Menu Controller
 *  prepares and updates menu topic items for the view
 */
goat.controller('goatMenu', function($scope, $http) {
    //TODO: implement via separate promise and use config for menu
    $http({method: 'GET', url: 'service/lessonmenu.mvc'}).then(
            function(menuData) {
                var menuItems = goat.addMenuClasses(goatConstants.menuPrefix.concat(menuData.data));
                $scope.menuTopics = menuItems;
            },
            function(error) {
                // TODO - handle this some way other than an alert
                alert("Error rendering menu: " + error);
            }
    );
    $scope.lessonUrl = "hi!";
    $scope.renderLesson = function(url) {
        console.log(url + ' was passed in');
        // use jquery to render lesson content to div
        jQuery.get(url,
                {},
                function(reply) {
                    jQuery("#lesson_content").html(reply);
                    // hook any forms
                    makeFormsAjax();
                },
                "html");
    };
})
        .animation('.slideDown', function() {
            var NgHideClassName = 'ng-hide';
            return {
                beforeAddClass: function(element, className, done) {
                    if (className === NgHideClassName) {
                        jQuery(element).slideUp(done);
                    }
                },
                removeClass: function(element, className, done) {
                    if (className === NgHideClassName) {
                        jQuery(element).hide().slideDown(done);
                    }
                }
            }
        });


//TODO add recursion to handle arr[i].children objects
// ... in case lower-level's need classes as well ... don't right now
goat.addMenuClasses = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        var menuItem = arr[i];
        //console.log(menuItem);
        if (menuItem.type && menuItem.type === 'CATEGORY') {
            menuItem.class = 'fa-angle-right pull-right';
        }
    }
    return arr;
};

function loadMenuData() {
    return $http({method: 'GET', url: 'service/lessonmenu.mvc'});
    //return [{"name":"Introduction","type":"CATEGORY","children":[{"name":"How to work with WebGoat","type":"LESSON","children":[],"complete":true,"link":"attack?Screen=35&menu=5"},{"name":"Tomcat Configuration","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=51&menu=5"},{"name":"Useful Tools","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=8&menu=5"},{"name":"How to create a Lesson","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=45&menu=5"}],"complete":false,"link":null},{"name":"General","type":"CATEGORY","children":[{"name":"Http Basics","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=19&menu=100"},{"name":"HTTP Splitting","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=5&menu=100"},{"name":"HTTP Basics (Spring MVC)","type":"LESSON","children":[],"complete":false,"link":"httpBasics.do?Screen=7&menu=100"}],"complete":false,"link":null},{"name":"Access Control Flaws","type":"CATEGORY","children":[{"name":"Using an Access Control Matrix","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=56&menu=200"},{"name":"Bypass a Path Based Access Control Scheme","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=60&menu=200"},{"name":"LAB: Role Based Access Control","type":"LESSON","children":[{"name":"Stage 1: Bypass Business Layer Access Control","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=68&menu=200&stage=1"},{"name":"Stage 2: Add Business Layer Access Control","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=68&menu=200&stage=2"},{"name":"Stage 3: Bypass Data Layer Access Control","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=68&menu=200&stage=3"},{"name":"Stage 4: Add Data Layer Access Control","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=68&menu=200&stage=4"}],"complete":false,"link":"attack?Screen=68&menu=200"},{"name":"Remote Admin Access","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=13&menu=200"}],"complete":false,"link":null},{"name":"AJAX Security","type":"CATEGORY","children":[{"name":"Same Origin Policy Protection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=44&menu=400"},{"name":"LAB: DOM-Based cross-site scripting","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=52&menu=400"},{"name":"LAB: Client Side Filtering","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=58&menu=400"},{"name":"DOM Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=77&menu=400"},{"name":"XML Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=62&menu=400"},{"name":"JSON Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=47&menu=400"},{"name":"Silent Transactions Attacks","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=71&menu=400"},{"name":"Dangerous Use of Eval","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=25&menu=400"},{"name":"Insecure Client Storage","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=46&menu=400"}],"complete":false,"link":null},{"name":"Authentication Flaws","type":"CATEGORY","children":[{"name":"Password Strength","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=69&menu=500"},{"name":"Forgot Password","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=67&menu=500"},{"name":"Basic Authentication","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=38&menu=500"},{"name":"Multi Level Login 2","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=36&menu=500"},{"name":"Multi Level Login 1","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=64&menu=500"}],"complete":false,"link":null},{"name":"Buffer Overflows","type":"CATEGORY","children":[{"name":"Off-by-One Overflows","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=53&menu=600"}],"complete":false,"link":null},{"name":"Code Quality","type":"CATEGORY","children":[{"name":"Discover Clues in the HTML","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=43&menu=700"}],"complete":false,"link":null},{"name":"Concurrency","type":"CATEGORY","children":[{"name":"Thread Safety Problems","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=72&menu=800"},{"name":"Shopping Cart Concurrency Flaw","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=18&menu=800"}],"complete":false,"link":null},{"name":"Cross-Site Scripting (XSS)","type":"CATEGORY","children":[{"name":"Phishing with XSS","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=57&menu=900"},{"name":"LAB: Cross Site Scripting","type":"LESSON","children":[{"name":"Stage 1: Stored XSS","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=23&menu=900&stage=1"},{"name":"Stage 2: Block Stored XSS using Input Validation","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=23&menu=900&stage=2"},{"name":"Stage 3: Stored XSS Revisited","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=23&menu=900&stage=3"},{"name":"Stage 4: Block Stored XSS using Output Encoding","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=23&menu=900&stage=4"},{"name":"Stage 5: Reflected XSS","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=23&menu=900&stage=5"},{"name":"Stage 6: Block Reflected XSS","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=23&menu=900&stage=6"}],"complete":false,"link":"attack?Screen=23&menu=900"},{"name":"Stored XSS Attacks","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=73&menu=900"},{"name":"Reflected XSS Attacks","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=34&menu=900"},{"name":"Cross Site Request Forgery (CSRF)","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=55&menu=900"},{"name":"CSRF Prompt By-Pass","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=48&menu=900"},{"name":"CSRF Token By-Pass","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=4&menu=900"},{"name":"HTTPOnly Test","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=11&menu=900"},{"name":"Cross Site Tracing (XST) Attacks","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=78&menu=900"}],"complete":false,"link":null},{"name":"Improper Error Handling","type":"CATEGORY","children":[{"name":"Fail Open Authentication Scheme","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=42&menu=1000"}],"complete":false,"link":null},{"name":"Injection Flaws","type":"CATEGORY","children":[{"name":"Command Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=14&menu=1100"},{"name":"Numeric SQL Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=80&menu=1100"},{"name":"Log Spoofing","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=79&menu=1100"},{"name":"XPATH Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=49&menu=1100"},{"name":"String SQL Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=39&menu=1100"},{"name":"LAB: SQL Injection","type":"LESSON","children":[{"name":"Stage 1: String SQL Injection","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=74&menu=1100&stage=1"},{"name":"Stage 2: Parameterized Query #1","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=74&menu=1100&stage=2"},{"name":"Stage 3: Numeric SQL Injection","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=74&menu=1100&stage=3"},{"name":"Stage 4: Parameterized Query #2","type":"STAGE","children":[],"complete":false,"link":"attack?Screen=74&menu=1100&stage=4"}],"complete":false,"link":"attack?Screen=74&menu=1100"},{"name":"Modify Data with SQL Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=41&menu=1100"},{"name":"Add Data with SQL Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=9&menu=1100"},{"name":"Database Backdoors ","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=15&menu=1100"},{"name":"Blind Numeric SQL Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=6&menu=1100"},{"name":"Blind String SQL Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=16&menu=1100"}],"complete":false,"link":null},{"name":"Denial of Service","type":"CATEGORY","children":[{"name":"Denial of Service from Multiple Logins","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=66&menu=1200"}],"complete":false,"link":null},{"name":"Insecure Communication","type":"CATEGORY","children":[{"name":"Insecure Login","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=70&menu=1300"}],"complete":false,"link":null},{"name":"Insecure Configuration","type":"CATEGORY","children":[{"name":"Forced Browsing","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=40&menu=1400"}],"complete":false,"link":null},{"name":"Insecure Storage","type":"CATEGORY","children":[{"name":"Encoding Basics","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=65&menu=1500"}],"complete":false,"link":null},{"name":"Malicious Execution","type":"CATEGORY","children":[{"name":"Malicious File Execution","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=21&menu=1600"}],"complete":false,"link":null},{"name":"Parameter Tampering","type":"CATEGORY","children":[{"name":"Bypass HTML Field Restrictions","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=54&menu=1700"},{"name":"Exploit Hidden Fields","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=37&menu=1700"},{"name":"Exploit Unchecked Email","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=50&menu=1700"},{"name":"Bypass Client Side JavaScript Validation","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=20&menu=1700"}],"complete":false,"link":null},{"name":"Session Management Flaws","type":"CATEGORY","children":[{"name":"Hijack a Session","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=75&menu=1800"},{"name":"Spoof an Authentication Cookie","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=76&menu=1800"},{"name":"Session Fixation","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=59&menu=1800"}],"complete":false,"link":null},{"name":"Web Services","type":"CATEGORY","children":[{"name":"Create a SOAP Request","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=22&menu=1900"},{"name":"WSDL Scanning","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=26&menu=1900"},{"name":"Web Service SAX Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=10&menu=1900"},{"name":"Web Service SQL Injection","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=63&menu=1900"}],"complete":false,"link":null},{"name":"Admin Functions","type":"CATEGORY","children":[{"name":"Report Card","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=28&menu=2000"}],"complete":false,"link":null},{"name":"Challenge","type":"CATEGORY","children":[{"name":"The CHALLENGE!","type":"LESSON","children":[],"complete":false,"link":"attack?Screen=12&menu=3000"}],"complete":false,"link":null}];
}



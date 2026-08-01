/* Hover biographies for the justice portraits.
 *
 * Used by the homepage bench strip (.faces) and the Brown card's bench
 * (.case-bench). Keyed by the last two path segments of each image, because
 * "jackson.jpg" means Ketanji Brown Jackson in justices/ and Robert H. Jackson
 * in brown-court/.
 *
 * One shared panel is appended to <body> and positioned with fixed coordinates,
 * so it is never clipped by the circular mask on the portrait or by any
 * overflow on a parent.
 */
(function () {
  var BIOS = {
    /* ---------- the pool of 20, homepage ---------- */
    'justices/roberts.jpg': { name: 'Chief Justice John G. Roberts Jr.', years: '2005 – present',
      bio: 'Appointed by George W. Bush in 2005 after a celebrated career arguing before the Court, Roberts came to the center chair from the D.C. Circuit. He is an institutionalist who worries publicly about the Court’s legitimacy and prefers narrow holdings that decide the case without unsettling more than necessary. His controlling votes often reflect that instinct: resolve the dispute on the narrowest available ground rather than the boldest.' },
    'justices/thomas.jpg': { name: 'Justice Clarence Thomas', years: '1991 – present',
      bio: 'Raised in Pin Point, Georgia, and appointed by George H. W. Bush in 1991, Thomas is the longest-serving member of the current Court. He is its most thoroughgoing originalist, reading the Constitution as it was understood when ratified and treating precedent as far more expendable than his colleagues do. He is known for solo concurrences inviting the Court to reconsider entire lines of doctrine.' },
    'justices/alito.jpg': { name: 'Justice Samuel A. Alito Jr.', years: '2006 – present',
      bio: 'A former United States Attorney in New Jersey and Third Circuit judge, Alito was appointed by George W. Bush in 2006. He writes from a consistently conservative position, with particular attention to religious liberty and to deference toward law enforcement and executive judgment in security matters. His questioning is pointed and hypothetical-driven, probing where a proposed rule would lead.' },
    'justices/sotomayor.jpg': { name: 'Justice Sonia Sotomayor', years: '2009 – present',
      bio: 'Appointed by Barack Obama in 2009, Sotomayor reached the Court from the Second Circuit after service as a federal trial judge in Manhattan. She anchors the Court’s liberal wing and writes with unusual attention to how a rule will land on criminal defendants, immigrants and people without resources. Her dissents are among the most forceful the Court produces.' },
    'justices/kagan.jpg': { name: 'Justice Elena Kagan', years: '2010 – present',
      bio: 'A former dean of Harvard Law School and Solicitor General, Kagan was appointed by Barack Obama in 2010 having never served as a judge. She is a pragmatic liberal who argues on her opponents’ terms, frequently beating textualists at close statutory reading. Her opinions are plainspoken and she is a persistent builder of majorities.' },
    'justices/gorsuch.jpg': { name: 'Justice Neil M. Gorsuch', years: '2017 – present',
      bio: 'Appointed by Donald Trump in 2017 from the Tenth Circuit, Gorsuch is a committed textualist and originalist. He reads statutes strictly by their words, which has produced results cutting across ideological lines, notably in criminal cases and in enforcing Native American treaty rights. He is a leading skeptic of judicial deference to administrative agencies.' },
    'justices/kavanaugh.jpg': { name: 'Justice Brett M. Kavanaugh', years: '2018 – present',
      bio: 'Kavanaugh served twelve years on the D.C. Circuit before his appointment by Donald Trump in 2018. He is conservative but often votes near the Court’s middle, favoring incremental steps and paying close attention to how heavily a precedent has been relied upon. He frequently writes separately to narrow the reach of a majority he has just joined.' },
    'justices/barrett.jpg': { name: 'Justice Amy Coney Barrett', years: '2020 – present',
      bio: 'A former Scalia clerk and Notre Dame law professor, Barrett was appointed by Donald Trump in 2020 from the Seventh Circuit. She approaches cases as an originalist and textualist, with an academic’s care for the theory underlying a doctrine. She has shown a preference for deciding narrowly and for spelling out what the Court is not holding.' },
    'justices/jackson.jpg': { name: 'Justice Ketanji Brown Jackson', years: '2022 – present',
      bio: 'Appointed by Joe Biden in 2022, Jackson is the first former federal public defender to sit on the Court. That background shows in her attention to criminal procedure and to how the system actually treats the people moving through it. She questions actively from the bench and grounds her arguments in text and history as readily as her originalist colleagues.' },
    'justices/ginsburg.jpg': { name: 'Justice Ruth Bader Ginsburg', years: '1993 – 2020',
      bio: 'Before joining the Court, Ginsburg built the modern law of sex discrimination as an ACLU litigator, winning case after case by choosing her plaintiffs and her increments with great care. Appointed by Bill Clinton in 1993, she was at first a cautious moderate who prized judicial restraint. In her later years she became the liberal wing’s most quoted dissenter.' },
    'justices/scalia.jpg': { name: 'Justice Antonin Scalia', years: '1986 – 2016',
      bio: 'Appointed by Ronald Reagan in 1986, Scalia did more than anyone to make originalism and textualism the terms in which modern constitutional argument is conducted. He insisted that judges read the words actually enacted rather than the purposes imagined behind them. The method produced some strongly defendant-friendly results, particularly in his revival of the Confrontation Clause.' },
    'justices/kennedy.jpg': { name: 'Justice Anthony M. Kennedy', years: '1988 – 2018',
      bio: 'Reagan’s third choice for the seat, Kennedy went on to hold the decisive vote in many of the Court’s most divided cases for two decades. His jurisprudence centers on individual liberty and dignity rather than on any fixed interpretive method. He wrote the Court’s major gay-rights decisions and co-authored the joint opinion preserving Roe in Casey.' },
    'justices/oconnor.jpg': { name: 'Justice Sandra Day O’Connor', years: '1981 – 2006',
      bio: 'The first woman to sit on the Supreme Court, appointed by Ronald Reagan in 1981 after service as an Arizona legislator and state judge. She was a pragmatist who distrusted broad rules and preferred standards applied case by case, which repeatedly left her holding the balance. Her opinions often turned on the particular facts rather than on sweeping principle.' },
    'justices/rehnquist.jpg': { name: 'Chief Justice William H. Rehnquist', years: '1972 – 2005',
      bio: 'Appointed an Associate Justice by Richard Nixon in 1972 and elevated to Chief Justice by Ronald Reagan in 1986. He led a revival of federalism, enforcing limits on Congress’s Commerce Clause power that had gone unenforced for half a century. He was also a notably efficient administrator who ran arguments and conferences briskly.' },
    'justices/stevens.jpg': { name: 'Justice John Paul Stevens', years: '1975 – 2010',
      bio: 'Appointed by Gerald Ford in 1975 as a moderate Republican, Stevens ended a 35-year tenure as the leader of the Court’s liberal wing. He was famously independent, drafting his own opinions and often writing separately rather than joining. He maintained that he had not changed so much as the Court had moved around him.' },
    'justices/souter.jpg': { name: 'Justice David H. Souter', years: '1990 – 2009',
      bio: 'Appointed by George H. W. Bush in 1990 and widely expected to be reliably conservative, Souter became a consistent member of the Court’s liberal bloc. He was a common-law judge at heart, reasoning incrementally from precedent and treating stare decisis as a serious constraint. He left the Court at sixty-nine to return to New Hampshire.' },
    'justices/breyer.jpg': { name: 'Justice Stephen G. Breyer', years: '1994 – 2022',
      bio: 'An administrative-law scholar and former First Circuit judge, Breyer was appointed by Bill Clinton in 1994. He read statutes for their purpose and their consequences, asking what workable result Congress would have wanted. He was the Court’s most avowedly pragmatic member and the source of its most elaborate hypotheticals at argument.' },
    'justices/marshall.jpg': { name: 'Justice Thurgood Marshall', years: '1967 – 1991',
      bio: 'Before becoming the first Black justice, Marshall argued Brown v. Board of Education and won twenty-nine of the thirty-two cases he brought to the Court as the NAACP’s chief litigator. Appointed by Lyndon Johnson in 1967, he was a steadfast liberal on civil rights and criminal justice. He dissented from every death sentence the Court allowed to stand, believing capital punishment unconstitutional in all circumstances.' },
    'justices/brennan.jpg': { name: 'Justice William J. Brennan Jr.', years: '1956 – 1990',
      bio: 'Appointed by Dwight Eisenhower in 1956, Brennan became the principal architect of the Warren Court’s expansion of individual rights. He was the Court’s great coalition builder, famously teaching his clerks that the most important rule was the ability to count to five. He wrote landmark First Amendment opinions, including New York Times v. Sullivan.' },
    'justices/white.jpg': { name: 'Justice Byron R. White', years: '1962 – 1993',
      bio: 'A former All-American running back and Deputy Attorney General, White was appointed by John F. Kennedy in 1962. He resisted ideological labels, supporting civil rights claims while frequently siding with the government in criminal procedure. He dissented in both Miranda v. Arizona and Roe v. Wade.' },

    /* ---------- the bench that decided Brown ---------- */
    'brown-court/warren.jpg': { name: 'Chief Justice Earl Warren', years: '1953 – 1969',
      bio: 'A three-term governor of California, Warren was appointed Chief Justice by Dwight Eisenhower in 1953, two months before Brown was reargued. He brought political skill rather than any doctrinal theory, and spent it building the unanimous opinion the case required. He was known for cutting through elaborate legal argument with a blunt question about whether a result was fair.' },
    'brown-court/black.jpg': { name: 'Justice Hugo L. Black', years: '1937 – 1971',
      bio: 'A former Alabama senator appointed by Franklin Roosevelt in 1937, Black was the Court’s leading textual absolutist. He argued that “no law” in the First Amendment meant precisely that, and campaigned for applying the whole Bill of Rights against the states. As an Alabamian he understood exactly what joining Brown would cost him at home, and joined it anyway.' },
    'brown-court/reed.jpg': { name: 'Justice Stanley F. Reed', years: '1938 – 1957',
      bio: 'A former Solicitor General appointed by Franklin Roosevelt in 1938, Reed was a cautious moderate who generally deferred to government authority. He was the last holdout in Brown, drafting a dissent before concluding that a divided Court would do more damage than his disagreement was worth. His vote is the reason the opinion could be announced as unanimous.' },
    'brown-court/frankfurter.jpg': { name: 'Justice Felix Frankfurter', years: '1939 – 1962',
      bio: 'A Harvard professor and Roosevelt adviser appointed in 1939, Frankfurter was the Court’s foremost advocate of judicial restraint. He believed judges should defer to elected legislatures, and worried openly about ordering a remedy the Court had no power to enforce. That concern shaped Brown’s cautious second opinion on implementation.' },
    'brown-court/douglas.jpg': { name: 'Justice William O. Douglas', years: '1939 – 1975',
      bio: 'Appointed by Franklin Roosevelt in 1939 at the age of forty, Douglas served more than thirty-six years, the longest tenure in the Court’s history. He was an impatient civil libertarian, far more interested in outcomes that protected individual freedom than in doctrinal tidiness. He later wrote Griswold v. Connecticut, locating a right to privacy in the penumbras of the Bill of Rights.' },
    'brown-court/jackson.jpg': { name: 'Justice Robert H. Jackson', years: '1941 – 1954',
      bio: 'Roosevelt’s Attorney General before joining the Court in 1941, Jackson took leave to serve as chief American prosecutor at Nuremberg. He was arguably the finest writer ever to sit on the Court, and his concurrence in the Steel Seizure Case still supplies the framework for measuring presidential power. Recovering from a heart attack in 1954, he left the hospital to be on the bench when Brown was announced.' },
    'brown-court/burton.jpg': { name: 'Justice Harold H. Burton', years: '1945 – 1958',
      bio: 'A Republican senator from Ohio, Burton was appointed by Harry Truman in 1945 in a deliberate gesture of bipartisanship. He was a modest, methodical justice who rarely sought attention and worked steadily for consensus. He was among the earliest on the Vinson Court to favor ending school segregation.' },
    'brown-court/clark.jpg': { name: 'Justice Tom C. Clark', years: '1949 – 1967',
      bio: 'Truman’s Attorney General before his appointment in 1949, Clark was a Texan with pronounced law-and-order instincts. He nonetheless wrote Mapp v. Ohio, which forced state courts to exclude illegally seized evidence. He resigned in 1967 to avoid a conflict when his son Ramsey became Attorney General.' },
    'brown-court/minton.jpg': { name: 'Justice Sherman Minton', years: '1949 – 1956',
      bio: 'A former Indiana senator and Seventh Circuit judge, Minton was appointed by Harry Truman in 1949. He was a committed believer in judicial restraint who thought courts should rarely second-guess the political branches. He joined Brown without hesitation, regarding segregation as beyond anything the Constitution could tolerate.' }
  };

  var imgs = document.querySelectorAll('.faces img, .case-bench img');
  if (!imgs.length) return;

  var panel = document.createElement('div');
  panel.className = 'jbio';
  panel.setAttribute('role', 'tooltip');
  panel.hidden = true;
  panel.innerHTML = '<p class="jbio-name"></p><p class="jbio-years"></p><p class="jbio-text"></p>';
  document.body.appendChild(panel);
  var elName = panel.querySelector('.jbio-name'),
      elYear = panel.querySelector('.jbio-years'),
      elText = panel.querySelector('.jbio-text');

  function lookup(img) {
    var parts = img.getAttribute('src').split('/');
    return BIOS[parts.slice(-2).join('/')];
  }

  function show(img) {
    var data = lookup(img);
    if (!data) return;
    elName.textContent = data.name;
    elYear.textContent = data.years;
    elText.textContent = data.bio;
    panel.hidden = false;

    // Measure after filling, then clamp inside the viewport so the portraits at
    // the ends of a row do not push their panel off-screen.
    var r = img.getBoundingClientRect(),
        p = panel.getBoundingClientRect(),
        margin = 12;

    var left = r.left + (r.width / 2) - (p.width / 2);
    left = Math.max(margin, Math.min(left, window.innerWidth - p.width - margin));

    var top = r.top - p.height - 14;
    if (top < margin) top = r.bottom + 14;   // no room above: flip below

    panel.style.left = Math.round(left) + 'px';
    panel.style.top = Math.round(top) + 'px';
  }

  function hide() { panel.hidden = true; }

  imgs.forEach(function (img) {
    img.addEventListener('mouseenter', function () { show(img); });
    img.addEventListener('mouseleave', hide);
    // Keyboard parity where the portrait is reachable; harmless otherwise.
    img.addEventListener('focus', function () { show(img); });
    img.addEventListener('blur', hide);
  });

  window.addEventListener('scroll', hide, { passive: true });
  window.addEventListener('resize', hide);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
})();

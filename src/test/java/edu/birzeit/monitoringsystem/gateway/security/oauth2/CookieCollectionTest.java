package edu.birzeit.monitoringsystem.gateway.security.oauth2;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.servlet.http.Cookie;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test the {@link CookieCollection}.
 */
public class CookieCollectionTest {
    public static final String COOKIE_NAME = "chocolate";
    public static final String COOKIE_VALUE = "yummy";
    public static final String BROWNIE_NAME = "brownie";
    private Cookie cookie;
    private Cookie cupsCookie;
    private Cookie brownieCookie;

    @BeforeEach
    public void setUp() {
        cookie = new Cookie(COOKIE_NAME, COOKIE_VALUE);
        cupsCookie = new Cookie("cups", "delicious");
        brownieCookie = new Cookie(BROWNIE_NAME, "mmh");
    }

    @Test
    public void size() {
        CookieCollection cookies = new CookieCollection();
        assertThat(cookies).hasSize(0);
        cookies.add(cookie);
        assertThat(cookies).hasSize(1);
    }

    @Test
    public void isEmpty() {
        CookieCollection cookies = new CookieCollection();
        assertThat(cookies).isEmpty();
        cookies.add(cookie);
        assertThat(cookies).isNotEmpty();
    }

    @Test
    public void contains() {
        CookieCollection cookies = new CookieCollection(cookie);
        assertThat(cookies.contains(cookie)).isTrue();
        assertThat(cookies.contains(COOKIE_NAME)).isTrue();
        assertThat(cookies.contains("yuck")).isFalse();
    }

    @Test
    public void iterator() {
        CookieCollection cookies = new CookieCollection(cookie);
        Iterator<Cookie> it = cookies.iterator();
        assertThat(it.hasNext()).isTrue();
        assertThat(it.next()).isEqualTo(cookie);
        assertThat(it.hasNext()).isFalse();
    }

    @Test
    public void toArray() {
        CookieCollection cookies = new CookieCollection(cookie);
        Cookie[] array = cookies.toArray();
        assertThat(array).hasSameSizeAs(cookies);
        assertThat(array[0]).isEqualTo(cookie);
    }

    @Test
    public void toArray1() {
        CookieCollection cookies = new CookieCollection(cookie);
        Cookie[] array = new Cookie[cookies.size()];
        cookies.toArray(array);
        assertThat(array).hasSameSizeAs(cookies);
        assertThat(array[0]).isEqualTo(cookie);
    }

    @Test
    public void add() {
        CookieCollection cookies = new CookieCollection(cookie);
        Cookie newCookie = new Cookie(BROWNIE_NAME, "mmh");
        cookies.add(newCookie);
        assertThat(cookies).hasSize(2);
        assertThat(cookies.contains(newCookie)).isTrue();
        assertThat(cookies.contains(BROWNIE_NAME)).isTrue();
    }

    @Test
    public void addAgain() {
        CookieCollection cookies = new CookieCollection(cookie, brownieCookie, cupsCookie);
        Cookie white = new Cookie(COOKIE_NAME, "white");
        boolean modified = cookies.add(white);
        assertThat(modified).isTrue();
        assertThat(cookies.get(COOKIE_NAME)).isEqualTo(white);
        assertThat(cookies.contains(white)).isTrue();
        assertThat(cookies.contains(cookie)).isFalse();
        assertThat(cookies.contains(COOKIE_NAME)).isTrue();
    }

    @Test
    public void get() {
        CookieCollection cookies = new CookieCollection(cookie, brownieCookie, cupsCookie);
        Cookie c = cookies.get(COOKIE_NAME);
        assertThat(c).isNotNull();
        assertThat(c).isEqualTo(cookie);
    }

    @Test
    public void remove() {
        CookieCollection cookies = new CookieCollection(cookie, brownieCookie, cupsCookie);
        cookies.remove(cookie);
        assertThat(cookies).hasSize(2);
        assertThat(cookies.contains(cookie)).isFalse();
        assertThat(cookies.contains(COOKIE_NAME)).isFalse();
        assertThat(cookies.contains(brownieCookie)).isTrue();
        assertThat(cookies.contains(BROWNIE_NAME)).isTrue();
    }

    @Test
    public void containsAll() {
        List<Cookie> content = Arrays.asList(cookie, brownieCookie);
        CookieCollection cookies = new CookieCollection(content);
        assertThat(cookies.containsAll(content)).isTrue();
        assertThat(cookies.containsAll(Collections.singletonList(cookie))).isTrue();
        assertThat(cookies.containsAll(Arrays.asList(cookie, brownieCookie, cupsCookie))).isFalse();
        assertThat(cookies.containsAll(Arrays.asList(COOKIE_NAME, BROWNIE_NAME))).isTrue();
    }

    @Test
    @SuppressWarnings("unchecked")
    public void addAll() {
        CookieCollection cookies = new CookieCollection();
        List<Cookie> content = Arrays.asList(cookie, brownieCookie, cupsCookie);
        boolean modified = cookies.addAll(content);
        assertThat(modified).isTrue();
        assertThat(cookies).hasSize(3);
        assertThat(cookies).containsAll(content);
        modified = cookies.addAll(Collections.EMPTY_LIST);
        assertThat(modified).isFalse();
    }

    @Test
    public void addAllEmpty() {
        CookieCollection cookies = new CookieCollection(cookie, brownieCookie, cupsCookie);
        boolean modified = cookies.addAll(Collections.EMPTY_LIST);
        assertThat(modified).isFalse();
        assertThat(cookies).contains(cookie, brownieCookie, cupsCookie);
    }

    @Test
    public void removeAll() {
        CookieCollection cookies = new CookieCollection(cookie, brownieCookie, cupsCookie);
        boolean modified = cookies.removeAll(Arrays.asList(brownieCookie, cupsCookie));
        assertThat(modified).isTrue();
        assertThat(cookies).hasSize(1);
        assertThat(cookies).doesNotContain(brownieCookie, cupsCookie);
    }

    @Test
    public void removeAllEmpty() {
        CookieCollection cookies = new CookieCollection(cookie, brownieCookie, cupsCookie);
        boolean modified = cookies.removeAll(Collections.EMPTY_LIST);
        assertThat(modified).isFalse();
        assertThat(cookies).contains(cookie, brownieCookie, cupsCookie);
    }

    @Test
    public void removeAllByName() {
        CookieCollection cookies = new CookieCollection(cookie, brownieCookie, cupsCookie);
        boolean modified = cookies.removeAll(Arrays.asList(COOKIE_NAME, BROWNIE_NAME));
        assertThat(modified).isTrue();
        assertThat(cookies).hasSize(1);
        assertThat(cookies).doesNotContain(brownieCookie, cookie);
    }

    @Test
    public void retainAll() {
        CookieCollection cookies = new CookieCollection(cookie, brownieCookie, cupsCookie);
        List<Cookie> content = Arrays.asList(cookie, brownieCookie);
        boolean modified = cookies.retainAll(content);
        assertThat(modified).isTrue();
        assertThat(cookies).hasSize(2);
        assertThat(cookies).containsAll(content);
        assertThat(cookies).doesNotContain(cupsCookie);
        modified = cookies.retainAll(content);
        assertThat(modified).isFalse();
    }

    @Test
    public void clear() {
        CookieCollection cookies = new CookieCollection(cookie);
        cookies.clear();
        assertThat(cookies).isEmpty();
    }
}

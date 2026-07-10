import {KnowledgeArticle} from "@/entities/article/model";
import {robotsExplainedArticle} from "@/entities/article/data/robots-explained";
import {schemaOrgExplainedArticle} from "@/entities/article/data/schema-org-explained";
import {sslExplainedArticle} from "@/entities/article/data/ssl-explained";
import {analyticsExplainedArticle} from "@/entities/article/data/analytics-explained";
import {sitemapXmlExplainedArticle} from "@/entities/article/data/sitemap-xml-explained";
import {openGraphExplainedArticle} from "@/entities/article/data/open-graph-explained";
import {canonicalExplainedArticle} from "@/entities/article/data/canonical-explained";
import {yandexMetrikaExplainedArticle} from "@/entities/article/data/yandex-metrika-explained";
import {googleSearchConsoleExplainedArticle} from "@/entities/article/data/google-search-console-explained";
import {cspExplainedArticle} from "@/entities/article/data/csp-explained";
import {securityHeadersExplainedArticle} from "@/entities/article/data/security-headers-explained";
import {protectedServiceFilesExplainedArticle} from "@/entities/article/data/protected-service-files-explained";
import {imageOptimizationExplainedArticle} from "@/entities/article/data/image-optimization-explained";
import {cssJsMinificationExplainedArticle} from "@/entities/article/data/css-js-minification-explained";
import {staticCachingExplainedArticle} from "@/entities/article/data/static-caching-explained";
import {gzipBrotliCompressionExplainedArticle} from "@/entities/article/data/gzip-brotli-compression-explained";
import {urlNormalizationExplainedArticle} from "@/entities/article/data/url-normalization-explained";
import {custom404PageExplainedArticle} from "@/entities/article/data/custom-404-page-explained";
import {utf8EncodingExplainedArticle} from "@/entities/article/data/utf8-encoding-explained";
import {altTextExplainedArticle} from "@/entities/article/data/alt-text-explained";
import {adaptiveLayoutExplainedArticle} from "@/entities/article/data/adaptive-layout-explained";
import {mobileMenuExplainedArticle} from "@/entities/article/data/mobile-menu-explained";
import {yandexWebmasterExplainedArticle} from "@/entities/article/data/yandex-webmaster-explained";
import {breadcrumbsMicrodataExplainedArticle} from "@/entities/article/data/breadcrumbs-microdata-explained";
import {conversionTrackingExplainedArticle} from "@/entities/article/data/conversion-tracking-explained";
import {cdnStaticFilesExplainedArticle} from "@/entities/article/data/cdn-static-files-explained";
import {contrastReadabilityExplainedArticle} from "@/entities/article/data/contrast-readability-explained";
import {keyboardNavigationExplainedArticle} from "@/entities/article/data/keyboard-navigation-explained";
import {ariaAttributesExplainedArticle} from "@/entities/article/data/aria-attributes-explained";
import {darkLightThemeExplainedArticle} from "@/entities/article/data/dark-light-theme-explained";
import {scrollAnimationsExplainedArticle} from "@/entities/article/data/scroll-animations-explained";
import {carouselSliderExplainedArticle} from "@/entities/article/data/carousel-slider-explained";
import {contactFormExplainedArticle} from "@/entities/article/data/contact-form-explained";
import {blogNewsExplainedArticle} from "@/entities/article/data/blog-news-explained";
import {portfolioCasesExplainedArticle} from "@/entities/article/data/portfolio-cases-explained";
import {multilingualExplainedArticle} from "@/entities/article/data/multilingual-explained";
import {onlineChatExplainedArticle} from "@/entities/article/data/online-chat-explained";
import {locationMapExplainedArticle} from "@/entities/article/data/location-map-explained";


const articles: KnowledgeArticle[] = [
  robotsExplainedArticle,
  schemaOrgExplainedArticle,
  sslExplainedArticle,
  analyticsExplainedArticle,
  sitemapXmlExplainedArticle,
  openGraphExplainedArticle,
  canonicalExplainedArticle,
  yandexMetrikaExplainedArticle,
  googleSearchConsoleExplainedArticle,
  cspExplainedArticle,
  securityHeadersExplainedArticle,
  protectedServiceFilesExplainedArticle,
  imageOptimizationExplainedArticle,
  cssJsMinificationExplainedArticle,
  staticCachingExplainedArticle,
  gzipBrotliCompressionExplainedArticle,
  urlNormalizationExplainedArticle,
  custom404PageExplainedArticle,
  utf8EncodingExplainedArticle,
  altTextExplainedArticle,
  adaptiveLayoutExplainedArticle,
  mobileMenuExplainedArticle,
  yandexWebmasterExplainedArticle,
  breadcrumbsMicrodataExplainedArticle,
  conversionTrackingExplainedArticle,
  cdnStaticFilesExplainedArticle,
  contrastReadabilityExplainedArticle,
  keyboardNavigationExplainedArticle,
  ariaAttributesExplainedArticle,
  darkLightThemeExplainedArticle,
  scrollAnimationsExplainedArticle,
  carouselSliderExplainedArticle,
  contactFormExplainedArticle,
  blogNewsExplainedArticle,
  portfolioCasesExplainedArticle,
  multilingualExplainedArticle,
  onlineChatExplainedArticle,
  locationMapExplainedArticle
];

export function getArticles(): KnowledgeArticle[] {
  return articles;
}
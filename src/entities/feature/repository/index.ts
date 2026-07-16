import {Feature} from "@/entities/feature/model";

import {robotsTxtFeature} from "@/entities/feature/data/robots";
import {schemaOrgFeature} from "@/entities/feature/data/schema-org";
import {sitemapXmlFeature} from "@/entities/feature/data/sitemap-xml";
import {openGraphFeature} from "@/entities/feature/data/open-graph";
import {canonicalFeature} from "@/entities/feature/data/canonical";
import {breadcrumbsMicrodataFeature} from "@/entities/feature/data/breadcrumbs-microdata";

import {googleAnalyticsFeature} from "@/entities/feature/data/google-analytics";
import {yandexMetrikaFeature} from "@/entities/feature/data/yandex-metrika";
import {googleSearchConsoleFeature} from "@/entities/feature/data/google-search-console";
import {yandexWebmasterFeature} from "@/entities/feature/data/yandex-webmaster";
import {conversionTrackingFeature} from "@/entities/feature/data/conversion-tracking";

import {sslCertificateFeature} from "@/entities/feature/data/ssl-certificate";
import {contentSecurityPolicyFeature} from "@/entities/feature/data/content-security-policy";
import {securityHeadersFeature} from "@/entities/feature/data/security-headers";
import {protectedServiceFilesFeature} from "@/entities/feature/data/protected-service-files";

import {imageOptimizationFeature} from "@/entities/feature/data/image-optimization";
import {cssJsMinificationFeature} from "@/entities/feature/data/css-js-minification";
import {cdnStaticFilesFeature} from "@/entities/feature/data/cdn-static-files";
import {staticCachingFeature} from "@/entities/feature/data/static-caching";
import {gzipBrotliCompressionFeature} from "@/entities/feature/data/gzip-brotli-compression";

import {urlNormalizationFeature} from "@/entities/feature/data/url-normalization";
import {custom404PageFeature} from "@/entities/feature/data/custom-404-page";
import {utf8EncodingFeature} from "@/entities/feature/data/utf8-encoding";

import {altTextFeature} from "@/entities/feature/data/alt-text";
import {contrastReadabilityFeature} from "@/entities/feature/data/contrast-readability";
import {keyboardNavigationFeature} from "@/entities/feature/data/keyboard-navigation";
import {ariaAttributesFeature} from "@/entities/feature/data/aria-attributes";

import {adaptiveLayoutFeature} from "@/entities/feature/data/adaptive-layout";
import {darkLightThemeFeature} from "@/entities/feature/data/dark-light-theme";
import {scrollAnimationsFeature} from "@/entities/feature/data/scroll-animations";
import {mobileMenuFeature} from "@/entities/feature/data/mobile-menu";
import {carouselSliderFeature} from "@/entities/feature/data/carousel-slider";

import {contactFormFeature} from "@/entities/feature/data/contact-form";
import {blogNewsFeature} from "@/entities/feature/data/blog-news";
import {portfolioCasesFeature} from "@/entities/feature/data/portfolio-cases";
import {multilingualFeature} from "@/entities/feature/data/multilingual";
import {onlineChatFeature} from "@/entities/feature/data/online-chat";
import {locationMapFeature} from "@/entities/feature/data/location-map";
import {contentPopulationFeature} from "@/entities/feature/data/content-population";
import {rateLimitingFeature} from "@/entities/feature/data/rate-limiting";
import {recaptchaAntispamFeature} from "@/entities/feature/data/recaptcha-antispam";

const features: Feature[] = [
  robotsTxtFeature,
  schemaOrgFeature,
  sitemapXmlFeature,
  openGraphFeature,
  canonicalFeature,
  breadcrumbsMicrodataFeature,

  googleAnalyticsFeature,
  yandexMetrikaFeature,
  googleSearchConsoleFeature,
  yandexWebmasterFeature,
  conversionTrackingFeature,

  sslCertificateFeature,
  contentSecurityPolicyFeature,
  securityHeadersFeature,
  protectedServiceFilesFeature,
  rateLimitingFeature,
  recaptchaAntispamFeature,

  imageOptimizationFeature,
  cssJsMinificationFeature,
  cdnStaticFilesFeature,
  staticCachingFeature,
  gzipBrotliCompressionFeature,

  urlNormalizationFeature,
  custom404PageFeature,
  utf8EncodingFeature,

  altTextFeature,
  contrastReadabilityFeature,
  keyboardNavigationFeature,
  ariaAttributesFeature,

  adaptiveLayoutFeature,
  darkLightThemeFeature,
  scrollAnimationsFeature,
  mobileMenuFeature,
  carouselSliderFeature,

  contactFormFeature,
  blogNewsFeature,
  portfolioCasesFeature,
  multilingualFeature,
  onlineChatFeature,
  locationMapFeature,
  contentPopulationFeature,
];

export function getFeatures(): Feature[] {
  return features;
}
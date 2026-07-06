import {Feature} from "@/entities/feature/model";
import {robotsTxtFeature} from "@/entities/feature/data/robots";


const features: Feature[] = [
  robotsTxtFeature,
];

export function getFeatures(): Feature[] {
  return features;
}
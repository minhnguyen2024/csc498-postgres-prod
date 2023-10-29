export default function FeatureDisabled({featureName} : {featureName: string}) {
  return (
    <div>
      <p>{featureName} is under maintainance. Please try again later</p>
    </div>
  );
}

import SectionHeading from '@/components/common/SectionHeading';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import OperationsResult from '@/components/operations/OperationsResult';
import useDeployResultsHashs from '@/hooks/operations/useDeployResultsHashs';

/**
 * Display all operations results
 * @returns {JSX.Element}
 * @constructor
 */
export default function OperationsResults() {
  const deployResultsHashs = useDeployResultsHashs();

  return (
    <GridRow>
      <SectionHeading
        title="Recent operations"
        description={!deployResultsHashs.length && 'No recent operation available.'}
      />
      {deployResultsHashs.map((hash) => (
        <GridCol key={hash}>
          <OperationsResult hash={hash} />
        </GridCol>
      ))}
    </GridRow>
  );
}

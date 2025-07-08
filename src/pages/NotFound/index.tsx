import { Container } from '../../components/Container';
import { MainTemplate } from '../../templates/MainTemplate';

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <h1>Página não encontrada!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non illo odit
          quos nihil, perferendis quasi totam labore repudiandae facere
          inventore culpa rem officia, exercitationem debitis.
        </p>
      </Container>
    </MainTemplate>
  );
}

import { ChildrenInterface } from '../interfaces/components';

export default function Table({ children }: ChildrenInterface) {

    return (
        <div className="table">
            <table className="table table-striped table-md table-hover align-middle table-bordered text-center">
                {children}
            </table>
        </div>
    );
}
